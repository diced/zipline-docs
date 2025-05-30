package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"time"
)

func LogTime(context string, msg string, duration time.Duration) {
	fmt.Printf("[%v] %v in %s\n", context, msg, duration)
}

func main() {
	ctxPtr := flag.String("ctx", "build", "the log context")
	outPtr := flag.String("out", "./sidebar.json", "the outfile")

	// may or may not work lol, i would just run it in the same dir as the docs dir to be safe.
	dirPtr := flag.String("dir", "./docs", "docs directory")

	flag.Parse()

	fsys := os.DirFS(*dirPtr)
	start := time.Now()

	sidebarAst := ConvertDirFiles(OrderSidebar(ReadSidebarAst(*dirPtr, fsys)))
	sidebar := CreateSidebarFromAst(*dirPtr, sidebarAst)

	stringJson, _ := json.MarshalIndent(sidebar, "", "  ")
	err := os.WriteFile(*outPtr, stringJson, 0644)
	if err != nil {
		log.Fatalln("error while writing sidebar.json", err)
	}

	elapsed := time.Since(start)
	LogTime(*ctxPtr, "generated sidebar.json", elapsed)
}