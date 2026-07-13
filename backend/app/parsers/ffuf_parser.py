class FFUFParser:

    PRIORITY = {
        200: 1,
        403: 2,
        401: 3,
        500: 4,
        301: 5,
        302: 6,
    }

    def parse(self, data):

        results = []

        for item in data.get("results", []):

            results.append({
                "path": item["input"]["FUZZ"],
                "status": item["status"],
                "url": item["url"],
                "size": item["length"],
                "words": item["words"],
                "lines": item["lines"],
                "redirect": item.get("redirectlocation")
            })

        results.sort(
            key=lambda x: self.PRIORITY.get(x["status"], 99)
        )

        return results


ffuf_parser = FFUFParser()