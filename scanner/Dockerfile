FROM kalilinux/kali-rolling

RUN apt-get update && \
    apt-get install -y \
    nmap \
    whatweb \
    sslscan \
    ffuf \
    sqlmap \
    nikto \
    curl \
    wget \
    git \
    python3 \
    python3-pip \
    golang-go && \
    apt-get clean

# Install ProjectDiscovery Tools
RUN go install github.com/projectdiscovery/httpx/cmd/httpx@latest
RUN go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
RUN go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
RUN go install github.com/projectdiscovery/katana/cmd/katana@latest

ENV PATH="/root/go/bin:${PATH}"

WORKDIR /scanner

COPY wordlists /wordlists
COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]