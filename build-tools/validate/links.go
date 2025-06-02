package validate

import (
	"regexp"
	"strings"
)

var mdLinkRE = regexp.MustCompile(
		`(?im)\[([^\]]+)\]\(\s*([^#\s\)]+)(?:#[^\s\)]+)?(?:\s+'([^']*)')?\s*\)`,
	)

type LinkType int

const (
	LinkTypeIgnore LinkType = iota
	LinkTypeCheck
)

type Link struct {
	Label string
	Href  string
	Type  LinkType
}

func GetFileLinks(content string) []Link {
	matches := mdLinkRE.FindAllStringSubmatch(content, -1)
	links := make([]Link, len(matches))

	for i, match := range matches {
		if len(match) < 3 {
			continue
		}

		link := Link{
			Label: match[1],
			Href:  match[2],
		}

		switch true {
		case strings.HasPrefix(link.Href, "http://") ||
			strings.HasPrefix(link.Href, "https://") ||
			strings.HasPrefix(link.Href, "#") ||
			strings.HasPrefix(link.Href, "./"):
			link.Type = LinkTypeIgnore
		default:
			link.Type = LinkTypeCheck
		}

		link.Href = strings.TrimSpace(link.Href)

		links[i] = link
	}

	return links
}