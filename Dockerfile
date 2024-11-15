# Use an official Go runtime as a parent image
FROM golang:1.21-alpine as builder

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
FROM alpine:latest  

# Set the Current Working Directory inside the container
WORKDIR /root/

# Copy the binary from the builder image
COPY --from=builder /app/richmond-paper-supply-website .

# Expose port (replace with your app's port)
EXPOSE 5080

# Run the Go binary
CMD ["./richmond-paper-supply-website"]
