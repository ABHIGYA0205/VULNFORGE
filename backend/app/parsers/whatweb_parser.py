class WhatWebParser:

    IGNORE = {
        "Country",
        "IP",
        "Script",
    }

    def parse(self, data):

        if not data:
            return {}

        result = data[0]

        plugins = result.get("plugins", {})

        technologies = []

        for tech in plugins.keys():

            if tech not in self.IGNORE:
                technologies.append(tech)

        return {

            "url": result.get("target"),

            "status": result.get("http_status"),

            "title": plugins.get("Title", {}).get("string", [""])[0],

            "server": plugins.get("HTTPServer", {}).get("string", [""])[0],

            "ip": plugins.get("IP", {}).get("string", [""])[0],

            "country": plugins.get("Country", {}).get("string", [""])[0],

            "technologies": technologies,

            "plugins": plugins

        }


whatweb_parser = WhatWebParser()