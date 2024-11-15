# Use an official Go runtime as a parent image
FROM golang:1.21-alpine as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files
COPY go.mod go.sum ./

COPY .env.example .env

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum are not changed
RUN go mod tidy

# Copy the entire project
COPY . .

# Build the Go app
RUN go build -o richmond-paper-supply-website .

# Start a new stage from a smaller image
FROM alpine:latest  

# Set the Current Working Directory inside the container
WORKDIR /root/

# Copy the binary from the builder image
COPY --from=builder /app/richmond-paper-supply-website .

# Expose port (optional: replace with the port your app runs on)
EXPOSE 5080

# Run the Go binary
CMD ["./richmond-paper-supply-website"]
