package validate

import (
	"slices"
	"strings"
)

func ValidateLinks(validLinks []string, links []Link) []Link {
	invalid := make([]Link, 0)

	for _, link := range links {
		if link.Type == LinkTypeIgnore {
			continue
		}

		href := strings.ToLower(strings.TrimSpace(link.Href))

		if !slices.Contains(validLinks, href) {
			invalid = append(invalid, link)
		}
	}

	return invalid
}