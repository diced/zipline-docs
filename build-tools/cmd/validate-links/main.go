package main

import (
	"flag"
	"fmt"
	"io/fs"
	"log"
	"os"
	"strings"
	"time"

	"github.com/diced/zipline-docs/build-tools/internal"
	"github.com/diced/zipline-docs/build-tools/validate"
)

var (
	COLOR_RESET = "\033[0m"
	COLOR_RED = "\033[31m"
	COLOR_BOLD = "\033[1m"
)

func glob(fsys fs.FS, match bool) ([]string, error) {
	matches := make([]string, 0)

	err := fs.WalkDir(fsys, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			return nil
		}

		if match {
			if !strings.HasSuffix(d.Name(), ".mdx") {
				return nil
			}
		}

		if d.Name() == "test.mdx" {
			return nil
		}

		matches = append(matches, path)
		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("error while walking dir: %w", err)
	}

	return matches, nil
}

func main() {
	dirFlag := flag.String("dir", "./docs", "docs directory")
	publicDirFlag := flag.String("public-dir", "./public", "public directory")
	exitOnInvalids := flag.Bool("exit", true, "exit after there are invalid links")
	printValidLinks := flag.Bool("print-valid-links", false, "print all valid links found in this project")

	flag.Parse()

	start := time.Now()

	fsys := os.DirFS(*dirFlag)
	matches, err := glob(fsys, true)
	if err != nil {
		log.Fatalln("error while globbing docs:", err)
	}

	fsysPublic := os.DirFS(*publicDirFlag)
	matchesPublic, err := glob(fsysPublic, false)
	if err != nil {
		log.Fatalln("error while globbing public dir:", err)
	}

	valids := validate.GetValidLinks(matches, matchesPublic)

	if *printValidLinks {
		fmt.Println("Valid links found in this project:")
		for _, link := range valids {
			fmt.Printf("- %s\n", link)
		}
		fmt.Printf("\nTotal valid links: %d\n", len(valids))

		return
	}

	shouldExit := false
	numInvalid := 0

	for _, file := range matches {
		content, err := fs.ReadFile(fsys, file)
		if err != nil {
			log.Fatalln("error while reading file:", err)
		}

		links := validate.GetFileLinks(string(content))

	  invalid := validate.ValidateLinks(valids, links)

		if len(invalid) > 0 {
			shouldExit = true

			fmt.Printf(COLOR_BOLD + COLOR_RED + "%s/%s:\n" + COLOR_RESET, *dirFlag, file)
			for _, link := range invalid {
				fmt.Printf("- [%s](" + COLOR_RED + "%s" + COLOR_RESET + ")\n", link.Label, link.Href)
				numInvalid++
			}
		}
	}

	elapsed := time.Since(start)

	fmt.Print("\n\n")

	if shouldExit && *exitOnInvalids {
		fmt.Printf("Found %d invalid links, exiting with error code 1\n", numInvalid)
		os.Exit(1)
	} else if shouldExit && !*exitOnInvalids {
		fmt.Printf("Found %d invalid links, but not exiting due to -exit=false\n", numInvalid)
		os.Exit(0)
	}

	internal.LogTime("validatelinks", "validated links", elapsed)
}
