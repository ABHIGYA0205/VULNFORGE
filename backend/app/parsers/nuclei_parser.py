class NucleiParser:

    def parse(self, findings):

        results = []
        seen = set()

        for item in findings:

            info = item.get("info", {})

            result = {

                "template": item.get("template-id", "-"),

                "name": (
                    info.get("name")
                    or item.get("matcher-name")
                    or item.get("template-id")
                    or "-"
                ),

                "severity": (
                    info.get("severity")
                    or "info"
                ).lower(),

                "description": (
                    info.get("description")
                    or "-"
                ),

                "matched": (
                    item.get("matched-at")
                    or "-"
                ),

                "host": (
                    item.get("host")
                    or "-"
                ),
            }

            key = (
                result["template"],
                result["name"],
                result["severity"],
            )

            if key in seen:
                continue

            seen.add(key)

            results.append(result)

        return sorted(
            results,
            key=lambda x: {
                "critical": 5,
                "high": 4,
                "medium": 3,
                "low": 2,
                "info": 1,
            }.get(x["severity"], 0),
            reverse=True,
        )


nuclei_parser = NucleiParser()