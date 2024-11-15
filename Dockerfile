# Use an official Go runtime with Go 1.23
FROM golang:1.23.1 as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the Go app
RUN go build -o richmond-paper-supply-website

# Start a new stage from a smaller image
FROM debian:bullseye-slim

# Set the Current Working Directory inside the container
WORKDIR /root/

# Copy the binary from the builder image
COPY --from=builder /app/richmond-paper-supply-website .

# Expose port (optional: replace with the port your app runs on)
EXPOSE 5080

# Run the Go binary
CMD ["./richmond-paper-supply-website"]
