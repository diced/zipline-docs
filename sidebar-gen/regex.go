package main

import (
	"regexp"
	"strings"
)

var (
	mdxRE           = regexp.MustCompile(`\.mdx$`)
	prefixRE        = regexp.MustCompile(`^/docs`)
	tagRE           = regexp.MustCompile(`<[^>]*>`)
	headerRE        = regexp.MustCompile(`^#[^#]+#?`)
	mdHeaderRE      = regexp.MustCompile(`^#{1,6}\s*([^#]*)\s*#{0,6}`)
	boldItalicRE    = regexp.MustCompile(`[*_]{1,3}(.*?)[*_]{1,3}`)
	strikethroughRE = regexp.MustCompile(`~~(\S.*\S)~~`)
	imgRE           = regexp.MustCompile(`!\[(.*?)\][[(].*?[\])\]]`)
	footnoteRE      = regexp.MustCompile(`\[\^.+?\](?:: .*$)?`)
	linkRE          = regexp.MustCompile(`\[(.*?)\][[(].*?[\])\]]`)
	inlineCodeRE    = regexp.MustCompile("`(.+?)`")
	blockquoteRE    = regexp.MustCompile(`^\s{0,3}>\s?`)
	colonRE         = regexp.MustCompile(`:::.+`)
	emojiRE         = regexp.MustCompile(`\s?:[^:\n]+:`)
	attrRE          = regexp.MustCompile(`\{#*[\w-]+\}`)
	titleRE         = regexp.MustCompile("(?m)^#[ ]+(.*)$")
)

func GetTitle(md string) string {
	match := titleRE.FindStringSubmatch(md)

	if len(match) > 1 {
		return match[1]
	}

	return ""
}

func GetDescription(md string) string {
	lines := strings.SplitSeq(strings.TrimLeft(md, " \n\r\t"), "\n")

	for line := range lines {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "```") || strings.HasPrefix(line, "import") {
			continue
		}

		cleanedLine := line
		cleanedLine = tagRE.ReplaceAllString(cleanedLine, "")
		cleanedLine = headerRE.ReplaceAllString(cleanedLine, "")
		cleanedLine = mdHeaderRE.ReplaceAllString(cleanedLine, "$1")
		cleanedLine = boldItalicRE.ReplaceAllString(cleanedLine, "$1")
		cleanedLine = strikethroughRE.ReplaceAllString(cleanedLine, "$1")
		cleanedLine = imgRE.ReplaceAllString(cleanedLine, "$1")
		cleanedLine = footnoteRE.ReplaceAllString(cleanedLine, "")
		cleanedLine = linkRE.ReplaceAllString(cleanedLine, "$1")
		cleanedLine = inlineCodeRE.ReplaceAllString(cleanedLine, "$1")
		cleanedLine = blockquoteRE.ReplaceAllString(cleanedLine, "")
		cleanedLine = colonRE.ReplaceAllString(cleanedLine, "")
		cleanedLine = emojiRE.ReplaceAllString(cleanedLine, "")
		cleanedLine = attrRE.ReplaceAllString(cleanedLine, "")
		cleanedLine = strings.TrimSpace(cleanedLine)

		if len(cleanedLine) == 0 {
			continue
		}

		return cleanedLine
	}

	return ""
}
