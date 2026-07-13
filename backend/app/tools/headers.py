import requests


class HeaderScanner:

    def scan(self, target: str):

        if not target.startswith(("http://", "https://")):
            url = f"http://{target}"
        else:
            url = target

        try:
            response = requests.get(
                url,
                timeout=10,
                allow_redirects=True
            )

            headers = response.headers

            return {
                "Content-Security-Policy": headers.get("Content-Security-Policy"),
                "Strict-Transport-Security": headers.get("Strict-Transport-Security"),
                "X-Frame-Options": headers.get("X-Frame-Options"),
                "X-Content-Type-Options": headers.get("X-Content-Type-Options"),
                "Referrer-Policy": headers.get("Referrer-Policy"),
                "Permissions-Policy": headers.get("Permissions-Policy"),
            }

        except Exception as e:
            return {
                "error": str(e)
            }


header_scanner = HeaderScanner()