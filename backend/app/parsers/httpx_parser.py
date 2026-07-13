class HTTPXParser:

    def parse(self, data):

        return {

            "url": data.get("url"),

            "status": data.get("status_code"),

            "title": data.get("title"),

            "server": data.get("webserver"),

            "ip": data.get("host_ip"),

            "response_time": data.get("time"),

            "technologies": data.get("tech", []),

            "content_length": data.get("content_length"),

            "cdn": data.get("cdn"),

            "content_type": data.get("content_type")

        }


httpx_parser = HTTPXParser()