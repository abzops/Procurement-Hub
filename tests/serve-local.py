"""Isolated browser QA: disable the live backend without changing config.js."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class LocalHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.split('?')[0] == '/config.js':
            payload = b'window.SNS_CONFIG = { useSupabase: false };'
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()


if __name__ == '__main__':
    root = str(Path(__file__).resolve().parent.parent)
    print('Isolated Procurement Hub: http://127.0.0.1:8789', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 8789), partial(LocalHandler, directory=root)).serve_forever()
