package sidebar

import (
	"encoding/json"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/adrg/frontmatter"
)

type AstType int

const (
	AstDir AstType = iota
	AstDirFile
	AstFile
)

type SidebarAst struct {
	Title       string
	Path        string
	Position    *int
	Hidden      *bool
	Description string
	Type        AstType
	Children    []SidebarAst
}

func (ast SidebarAst) MdxPathUrl() string {
	if ast.Type == AstDirFile {
		fileName := filepath.Base(ast.Path)

		return strings.ReplaceAll(ast.Path, "/"+fileName, "")
	}

	return ast.Path
}

func GetFrontmatter(path string) (string, MdxFrontmatter) {
	var fm MdxFrontmatter

	f, err := os.Open(path)
	if err != nil {
		log.Fatalln("error while opening file:", err)
	}

	rest, _ := frontmatter.Parse(f, &fm)

	return string(rest), fm
}

type MdxFrontmatter struct {
	Position *int  `yaml:"sidebar_position,omitempty"`
	Hidden   *bool `yaml:"sidebar_hidden,omitempty"`
}

type Category struct {
	Label    string `json:"label"`
	Position int    `json:"position"`
}

func ReadCategoryJson(file string) Category {
	f, err := os.Open(file)
	if err != nil {
		log.Fatal("error while opening category.json:", err)
	}

	defer f.Close()

	bytes, _ := io.ReadAll(f)
	var category Category

	json.Unmarshal(bytes, &category)

	return category
}

func ReadSidebarAst(dir string) []SidebarAst {
	sidebar := make([]SidebarAst, 0)

	files, err := os.ReadDir(dir)
	if err != nil {
		log.Fatal("error while reading dir:", err)
	}

	for _, file := range files {
		filePath := filepath.Join(dir, file.Name())

		if file.IsDir() {
			children := ReadSidebarAst(filePath)

			categoryJsonPath := filepath.Join(filePath, "_category_.json")
			if _, err := os.Stat(categoryJsonPath); err == nil {
				category := ReadCategoryJson(categoryJsonPath)

				sidebar = append(sidebar, SidebarAst{
					Title:    category.Label,
					Path:     filePath,
					Type:     AstDir,
					Children: children,
					Position: &category.Position,
				})
			} else {
				sidebar = append(sidebar, SidebarAst{
					Title:    file.Name(),
					Path:     filePath,
					Type:     AstDir,
					Children: children,
				})
			}
		} else {
			if file.Name() == "_category_.json" {
				continue
			}
			if file.Name() == filepath.Base(dir)+".mdx" {
				continue
			}

			md, fm := GetFrontmatter(filePath)

			item := SidebarAst{
				Title:       GetTitle(md),
				Path:        filePath,
				Type:        AstFile,
				Description: GetDescription(md),
			}

			if fm.Position != nil {
				item.Position = fm.Position
			}

			if fm.Hidden != nil {
				item.Hidden = fm.Hidden
			}

			sidebar = append(sidebar, item)
		}
	}

	return sidebar
}

func ConvertDirFiles(sidebar []SidebarAst) []SidebarAst {
	for i := range len(sidebar) {
		item := sidebar[i]

		if item.Type != AstDir {
			continue
		}

		fileName := filepath.Base(item.Path) + ".mdx"
		filePath := filepath.Join(item.Path, fileName)

		if _, err := os.Stat(filePath); err == nil {
			md, _ := GetFrontmatter(filePath)

			item.Type = AstDirFile
			item.Path = filePath
			item.Children = ConvertDirFiles(item.Children)
			item.Title = GetTitle(md)
			item.Description = GetDescription(md)
		} else {
			item.Children = ConvertDirFiles(item.Children)
		}
		sidebar[i] = item
	}

	return sidebar
}
