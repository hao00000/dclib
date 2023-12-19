# ! /usr/bin/env python
# Usage: python server.py <port>

from SimpleHTTPServer import SimpleHTTPRequestHandler, BaseHTTPServer


class CORSRequestHandler(SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
        self.end_headers()
        return

    def end_headers(self):
        SimpleHTTPRequestHandler.end_headers(self)


if __name__ == '__main__':
    BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)