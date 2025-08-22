package main

import (
	"encoding/json"
	"flag"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"runtime"
	"slices"
	"time"

	"github.com/diced/zipline-docs/build-tools/internal"
	"github.com/diced/zipline-docs/build-tools/sidebar"
	"github.com/fsnotify/fsnotify"
)

var (
	ctxFlag      = flag.String("ctx", "build-watch", "the log context")
	outFlag      = flag.String("out", "./sidebar.json", "the outfile")
	dirFlag      = flag.String("dir", "./docs", "docs directory")
	grcFlag      = flag.Int("grc", runtime.NumCPU(), "number of concurrent goroutines to run at a time")
	noIndentFlag = flag.Bool("no-indent", false, "do not indent the output JSON")
)

func generate() {
	start := time.Now()

	sidebarAst := sidebar.ConvertDirFiles(sidebar.OrderSidebar((sidebar.ReadSidebarAst(*dirFlag))))
	sidebar := sidebar.CreateSidebarFromAst(*dirFlag, sidebarAst)

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
	internal.LogTime(*ctxFlag, "generated sidebar.json", elapsed)
}

func main() {
	flag.Parse()

	// only cache once since we don't really need to update dates when in dev
	sidebar.CachedTimes = sidebar.CreateDateMap(sidebar.GitFiles(*dirFlag), *grcFlag)

	w, err := fsnotify.NewWatcher()
	if err != nil {
		panic(err)
	}

	defer w.Close()

	go func() {
		for {
			select {
			case err, ok := <-w.Errors:
				if !ok {
					return
				}
				panic(err)
			case e, ok := <-w.Events:
				if e.Has(fsnotify.Create) {
					st, err := os.Stat(e.Name)
					if err == nil {
						if st.IsDir() && !slices.Contains(w.WatchList(), e.Name) {
							w.Add(e.Name)
						}
					}
				}

				if !ok {
					return
				}

				generate()
			}
		}
	}()

	err = w.Add(*dirFlag)
	if err != nil {
		log.Fatalln("error while adding directory to watcher", err)
	}

	err = filepath.WalkDir(*dirFlag, func(path string, d fs.DirEntry, err error) error {
		if d.IsDir() {
			w.Add(path)
			return nil
		}

		return nil
	})

	generate()

	<-make(chan struct{})
}
