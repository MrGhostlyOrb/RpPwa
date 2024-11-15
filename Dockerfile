FROM golang:1.23.1

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -o /richmond-paper-supply-website

# Expose port (optional: replace with the port your app runs on)
EXPOSE 5080

# Run the Go binary
CMD ["/richmond-paper-supply-website"]
