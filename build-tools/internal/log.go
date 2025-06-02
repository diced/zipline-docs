package internal

import (
	"fmt"
	"time"
)

func LogTime(context string, msg string, duration time.Duration) {
	fmt.Printf("[%v] %v in %s\n", context, msg, duration)
}