package main

import (
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	port := os.Getenv("PORT")
	cdnURL := os.Getenv("CDN_URL")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl, err := template.ParseFiles("./public/index.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		data := struct {
			CDNURL string
		}{
			CDNURL: cdnURL,
		}

		err = tmpl.Execute(w, data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	http.HandleFunc("/privacy", func(w http.ResponseWriter, r *http.Request) {
		tmpl, err := template.ParseFiles("./public/privacy.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		data := struct {
			CDNURL string
		}{
			CDNURL: cdnURL,
		}

		err = tmpl.Execute(w, data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	fs := http.FileServer(http.Dir("./public/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	log.Printf("Starting server on http://0.0.0.0:%s\n", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
