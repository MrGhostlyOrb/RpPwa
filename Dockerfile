# Use an official Ubuntu image
FROM ubuntu:22.04

# Install Go 1.23 and necessary dependencies
RUN apt-get update && apt-get install -y \
    golang-1.23 \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./

# Download Go dependencies
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go application
RUN go build -o richmond-paper-supply-website .

# Set the directory to where the binary will be executed
WORKDIR /root/

# Expose the port your app runs on
EXPOSE 5080

# Run the Go binary when the container starts
CMD ["./richmond-paper-supply-website"]
