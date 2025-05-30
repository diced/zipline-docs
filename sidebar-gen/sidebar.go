package main

import (
	"sort"
	"strings"
	"time"
)

type SidebarItem struct {
	Title       string        `json:"title"`
	Path        string        `json:"path"`
	LastUpdated time.Time     `json:"lastUpdated,omitzero"`
	Href        string        `json:"href,omitempty"`
	Items       []SidebarItem `json:"items,omitempty"`
	Description string        `json:"description,omitempty"`
	Hidden      bool          `json:"hidden,omitempty"`
}

func OrderSidebar(sidebar []SidebarAst) []SidebarAst {
	sort.SliceStable(sidebar, func(aIdx, bIdx int) bool {
		a := sidebar[aIdx]
		b := sidebar[bIdx]

		if a.Position == nil && b.Position == nil {
			return false
		}

		if a.Position == nil && b.Position != nil {
			return false
		}

		if a.Position != nil && b.Position == nil {
			return true
		}

		return *a.Position < *b.Position
	})

	for i := range sidebar {
		if len(sidebar[i].Children) > 0 {
			sidebar[i].Children = OrderSidebar(sidebar[i].Children)
		}
	}

	return sidebar
}

func CreateSidebarFromAst(dir string, ast []SidebarAst) []SidebarItem {
	sidebar := make([]SidebarItem, 0)

	for _, astItem := range ast {
		href := PathToHref(dir, astItem.MdxPathUrl())

		item := SidebarItem{
			Title:       astItem.Title,
			Path:        "./" + astItem.MdxPathUrl(),
			LastUpdated: GetLastUpdated(astItem.Path),
			Hidden:      astItem.Hidden != nil && *astItem.Hidden,
		}

		if astItem.Type == AstDir {
			item.Items = CreateSidebarFromAst(dir, astItem.Children)
		} else if astItem.Type == AstDirFile {
			item.Href = href
			item.Items = CreateSidebarFromAst(dir, astItem.Children)
			item.Description = astItem.Description
		} else {
			item.Href = href
			item.Description = astItem.Description
		}

		sidebar = append(sidebar, item)
	}

	return sidebar
}

func PathToHref(dir string, path string) string {
	newPath := mdxRE.ReplaceAllString(path, "")
	newPath = prefixRE.ReplaceAllString(newPath, "")
	newPath = strings.ReplaceAll(newPath, dir, "")

	return "/" + strings.TrimLeft(newPath, "/")
}
