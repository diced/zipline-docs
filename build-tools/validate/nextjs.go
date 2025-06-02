package validate

import (
	"encoding/json"
	"log"
	"os"
	"strings"
)

type NextJSRoutesManifest struct {
	Redirects []struct {
		Source      string `json:"source"`
		Destination string `json:"destination"`
	} `json:"redirects"`
	StaticRoutes []struct {
		Page string `json:"page"`
	} `json:"staticRoutes"`
	DataRoutes []struct {
		Page string `json:"page"`
	} `json:"dataRoutes"`
}

func GetRoutesManifest() NextJSRoutesManifest {
	var routesManifest NextJSRoutesManifest

	bytes, err := os.ReadFile("./build/routes-manifest.json")
	if err != nil {
		log.Fatalln("error while reading routes manifest:", err)
	}

	err = json.Unmarshal(bytes, &routesManifest)
	if err != nil {
		log.Fatalln("error while unmarshalling routes manifest:", err)
	}

	return routesManifest
}

func FilterNextLinks(routesManifest NextJSRoutesManifest) []string {
	nextRoutes := make([]string, 0)

	for _, redirect := range routesManifest.Redirects {
		if strings.HasPrefix(redirect.Source, "/:path+/") {
			continue
		}

		nextRoutes = append(nextRoutes, strings.ToLower(redirect.Source))
	}

	for _, staticRoute := range routesManifest.StaticRoutes {
		if staticRoute.Page == "/" {
			continue
		}

		nextRoutes = append(nextRoutes, strings.ToLower(staticRoute.Page))
	}

	for _, dataRoute := range routesManifest.DataRoutes {
		if strings.HasSuffix(dataRoute.Page, "[...slug]") {
			continue
		}

		nextRoutes = append(nextRoutes, strings.ToLower(dataRoute.Page))
	}

	return nextRoutes
}

func FilterPublicLinks(publicRoutes []string) []string {
	valid := make([]string, len(publicRoutes))

	for i, route := range publicRoutes {
		valid[i] = "/" + strings.ToLower(route)
	}

	return valid
}

func GetValidLinks(mdxRoutes []string, publicDirRoutes []string) []string {
	routesManifest := GetRoutesManifest()
	nextRoutes := FilterNextLinks(routesManifest)
	pubRoutes  := FilterPublicLinks(publicDirRoutes)

	totalLen := len(nextRoutes) + len(pubRoutes) + len(mdxRoutes)

	valids := make([]string, 0, totalLen)
	valids = append(valids, nextRoutes...)
	valids = append(valids, pubRoutes...)

	for _, route := range mdxRoutes {
		name := strings.ReplaceAll(route, ".mdx", "")
		href := "/docs/" + strings.ToLower(name)

		valids = append(valids,  href)
	}

	return valids
}
