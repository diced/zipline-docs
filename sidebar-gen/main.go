package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"runtime"
	"time"
)

var (
	ctxFlag      = flag.String("ctx", "build", "the log context")
	outFlag      = flag.String("out", "./sidebar.json", "the outfile")
	dirFlag      = flag.String("dir", "./docs", "docs directory")
	grcFlag      = flag.Int("grc", runtime.NumCPU(), "number of concurrent goroutines to run at a time")
	noIndentFlag = flag.Bool("no-indent", false, "do not indent the output JSON file")
)

func LogTime(context string, msg string, duration time.Duration) {
	fmt.Printf("[%v] %v in %s\n", context, msg, duration)
}

func main() {
	flag.Parse()

	cachedTimes = CreateDateMap(gitFiles())

	start := time.Now()

	sidebarAst := ConvertDirFiles(OrderSidebar(ReadSidebarAst(*dirFlag)))
	sidebar := CreateSidebarFromAst(*dirFlag, sidebarAst)

	var stringJson []byte
	if *noIndentFlag {
		stringJson, _ = json.Marshal(sidebar)
	} else {
		stringJson, _ = json.MarshalIndent(sidebar, "", "  ")
	}

	err := os.WriteFile(*outFlag, stringJson, 0644)
	if err != nil {
		log.Fatalln("error while writing sidebar.json", err)
	}

	elapsed := time.Since(start)
	LogTime(*ctxFlag, "generated sidebar.json", elapsed)
}
