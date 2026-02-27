from http.server import BaseHTTPRequestHandler
import json


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        metrics = {
            'carbon_emissions_avoided': 620.0,
            'asset_life_extended': 32.0,
            'energy_efficiency_gain': 14.0,
            'compliance_status': 100.0,
            'preventive_replacements_count': 4,
            'cables_avoided_replacement': 64,
            'carbon_saved_kg': 620.0,
            'last_report_generated': '2025-12-01T14:32:00Z',
        }

        data = {
            'metrics': metrics,
            'lifecycle_insight': f"Preventive maintenance on {metrics['cables_avoided_replacement']} cables avoided early replacement, saving {metrics['carbon_saved_kg']} kg of embodied carbon.",
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
