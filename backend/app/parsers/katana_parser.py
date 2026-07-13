class KatanaParser:

    def parse(self, data):

        urls = []
        seen = set()

        for item in data:

            url = (
                item.get("url")
                or item.get("request", {}).get("endpoint")
                or item.get("endpoint")
            )

            if not url:
                continue

            if url in seen:
                continue

            seen.add(url)

            urls.append({
                "url": url
            })

        return urls


katana_parser = KatanaParser()