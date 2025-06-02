package sidebar

import (
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/diced/zipline-docs/build-tools/internal"
)

type CacheTimes map[string]time.Time

func osModTime(path string) time.Time {
	info, err := os.Stat(path)
	if err != nil {
		log.Fatalf("[%s] error while getting file info: %v", path, err)
	}

	return info.ModTime()
}

func GitFiles(dir string) []string {
	cmd := exec.Command("git", "ls-files", dir)
	out, err := cmd.Output()
	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(strings.TrimSpace(string(out)), "\n")
	return lines
}

func CreateDateMap(files []string, processes int) CacheTimes {
	start := time.Now()

	result := make(CacheTimes)

	// concurrency shit
	var waitGroup sync.WaitGroup
	var mutex sync.Mutex
	semaphore := make(chan struct{}, processes)

	for _, file := range files {
		waitGroup.Add(1)

		go func(f string) {
			defer waitGroup.Done()

			semaphore <- struct{}{}
			defer func() { <-semaphore }()

			cmd := exec.Command("git", "log", "-1", "--format=%ct", "--", file)
			out, err := cmd.Output()
			if err != nil {
				log.Printf("[%v] couldn't get git log info: %v\n", file, err)
				return
			}

			tsStr := strings.TrimSpace(string(out))
			if tsStr == "" {
				log.Printf("[%v] git log output is empty\n", file)
				return
			}

			ts, err := strconv.ParseInt(tsStr, 10, 64)
			if err != nil {
				log.Printf("[%v] can't convert into timestamp into int: %v\n", file, tsStr)
				return
			}
			t := time.Unix(ts, 0)

			mutex.Lock()
			result[f] = t
			mutex.Unlock()
		}(file)
	}

	waitGroup.Wait()

	elapsed := time.Since(start)
	internal.LogTime("gitcache", "populated git cache", elapsed)

	return result
}

func GetLastUpdated(path string) time.Time {
	cached := CachedTimes[path]
	if cached.IsZero() {
		return osModTime(path)
	}

	return cached
}

var CachedTimes CacheTimes
