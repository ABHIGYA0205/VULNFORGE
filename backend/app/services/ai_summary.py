class AISummary:

    def generate(self, results):

        ports = len(results.get("nmap", {}).get("ports", []))
        tech = len(results.get("whatweb", {}).get("technologies", []))
        dirs = len(results.get("directories", []))
        endpoints = len(results.get("endpoints", []))
        vulns = len(results.get("vulnerabilities", []))

        if vulns >= 5:
            risk = "High"
        elif vulns >= 2:
            risk = "Medium"
        else:
            risk = "Low"

        return {
            "risk": risk,
            "summary": f"""
Target analysis completed.

• Open Ports: {ports}
• Technologies: {tech}
• Hidden Directories: {dirs}
• Endpoints: {endpoints}
• Vulnerabilities: {vulns}

Overall Risk: {risk}

Recommendations:

- Review exposed endpoints.
- Keep server software updated.
- Enable all recommended security headers.
- Investigate any detected vulnerabilities.
""".strip()
        }

ai_summary = AISummary()