# 🛡️ VulnForge

VulnForge is a local-first web vulnerability scanner that combines multiple security tools into a single dashboard. It performs reconnaissance, technology detection, endpoint discovery, directory fuzzing, vulnerability scanning, SSL analysis, and AI-powered report summarization.

---

# Features

- 🔍 Nmap Port Scanning
- 🌐 WhatWeb Technology Detection
- ⚡ HTTPX HTTP Information
- 🔒 Security Headers Analysis
- 🔐 SSL Certificate Analysis
- 📂 FFUF Directory Discovery
- 🕸️ Katana Endpoint Crawling
- ☢️ Nuclei Vulnerability Scanning
- 🤖 AI Generated Security Summary
- 📊 Dashboard
- 📜 Scan History
- 📄 Reports
- 🗄 PostgreSQL Database

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Docker SDK

## Security Tools

- Nmap
- WhatWeb
- HTTPX
- FFUF
- Katana
- Nuclei
- SSLScan

---

# Project Structure

```
VulnForge
│
├── frontend
│
├── backend
│
├── scanner
│
├── docker-compose.yml
│
└── README.md
```

---

# Requirements

Install

- Docker Desktop
- Python 3.11+
- Node.js 20+
- npm

---

# Installation

Clone

```bash
git clone <your-repo-url>

cd VulnForge
```

---

# Database

Start PostgreSQL

```bash
docker compose up -d postgres
```

Verify

```bash
docker ps
```

You should see

```
vulnforge-db
```

---

# Scanner Container

Build

```bash
docker compose build scanner
```

Start

```bash
docker compose up -d scanner
```

Verify

```bash
docker ps
```

You should see

```
vulnforge-scanner
```

---

# Backend Setup

Go to backend

```bash
cd backend
```

Create virtual environment

Mac/Linux

```bash
python3 -m venv venv
```

Windows

```bash
python -m venv venv
```

Activate

Mac/Linux

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# Database Migration

Create migration

```bash
alembic revision --autogenerate -m "Initial"
```

Apply

```bash
alembic upgrade head
```

---

# Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Go to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# Scanner Container

Enter container

```bash
docker exec -it vulnforge-scanner bash
```

Useful commands

Update Nuclei templates

```bash
nuclei -update-templates
```

Update HTTPX

```bash
httpx -update
```

Check tools

```bash
nmap --version

whatweb --version

httpx -version

ffuf -V

katana -version

nuclei -version

sslscan --version
```

Exit

```bash
exit
```

---

# Database Access

Open PostgreSQL

```bash
docker exec -it vulnforge-db psql -U vulnforge -d vulnforge
```

Useful SQL

Show scans

```sql
SELECT * FROM scans;
```

Delete scan

```sql
DELETE FROM scans
WHERE id='SCAN_ID';
```

Exit

```sql
\q
```

---

# Running a Scan

Open

```
http://localhost:3000
```

Go to

```
New Scan
```

Enter

```
Target

Profile
```

Start Scan

Results appear in

- Overview
- Ports
- Technologies
- HTTP
- Headers
- SSL
- Directories
- Endpoints
- Vulnerabilities
- AI Summary

---

# Suggested Test Targets

General

```
example.com
```

ProjectDiscovery

```
projectdiscovery.io
```

Google

```
google.com
```

Local OWASP Juice Shop

```
http://host.docker.internal:3000
```

---

# Docker Commands

Build Scanner

```bash
docker compose build scanner
```

Start

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

Restart Scanner

```bash
docker restart vulnforge-scanner
```

Restart Database

```bash
docker restart vulnforge-db
```

---

# Troubleshooting

## Backend won't start

Check

```bash
docker ps
```

Verify PostgreSQL is running.

---

## Database Error

Run

```bash
alembic upgrade head
```

---

## Nuclei returns nothing

Update templates

```bash
nuclei -update-templates
```

---

## FFUF returns too many directories

Directories are grouped by HTTP status.

---

## Katana finds no endpoints

Use a website that allows crawling or run OWASP Juice Shop locally.

---

# Future Improvements

- Authentication
- PDF Report Export
- Scan Scheduling
- CVSS Risk Scoring
- Email Notifications
- WebSocket Live Updates
- Scan Comparison
- Asset Management
- Multi-user Support

---

# Disclaimer

VulnForge is intended for educational purposes and authorized security testing only.

Do **not** scan systems without explicit permission.

Unauthorized scanning may violate laws and policies.

---

# Author

**Abhigya Sachdeva**

B.Tech Data Science

Newton School of Technology