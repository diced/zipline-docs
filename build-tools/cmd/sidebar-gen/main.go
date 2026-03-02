package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"
	"runtime"
	"time"

	"github.com/diced/zipline-docs/build-tools/internal"
	"github.com/diced/zipline-docs/build-tools/sidebar"
)

func main() {
	ctxFlag := flag.String("ctx", "build", "the log context")
	outFlag := flag.String("out", "./sidebar.json", "the outfile")
	dirFlag := flag.String("dir", "./docs", "docs directory")
	grcFlag := flag.Int("grc", runtime.NumCPU(), "number of concurrent goroutines to run at a time")
	noIndentFlag := flag.Bool("no-indent", false, "do not indent the output JSON file")

	flag.Parse()

	sidebar.CachedTimes = sidebar.CreateDateMap(sidebar.GitFiles(*dirFlag), *grcFlag)

	start := time.Now()

	sidebarAst := sidebar.ConvertDirFiles(sidebar.OrderSidebar(sidebar.ReadSidebarAst(*dirFlag)))
	sidebarObject := sidebar.CreateSidebarFromAst(*dirFlag, sidebarAst)
	sidebarObject = append(sidebarObject, sidebar.API_ITEM)

	var stringJson []byte
	if *noIndentFlag {
		stringJson, _ = json.Marshal(sidebarObject)
	} else {
		stringJson, _ = json.MarshalIndent(sidebarObject, "", "  ")
	}

	err := os.WriteFile(*outFlag, stringJson, 0644)
	if err != nil {
		log.Fatalln("error while writing sidebar.json", err)
	}

	elapsed := time.Since(start)
	internal.LogTime(*ctxFlag, "generated sidebar.json", elapsed)
}
