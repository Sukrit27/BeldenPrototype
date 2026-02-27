from http.server import BaseHTTPRequestHandler
import json


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        health_data = {
            'overall_health': 96.0,
            'active_critical_faults': 5,
            'assets_at_risk': 18,
            'downtime_risk_avoided': 1200000.00,
            'health_change': 2,
        }

        faults_data = [
            {
                'id': 1,
                'asset_id': 'CBL-0451',
                'location': 'Rack 2, Port 7',
                'issue_type': 'Impedance Drift',
                'risk_level': 'critical',
                'action': 'Replace Cable',
            },
            {
                'id': 2,
                'asset_id': 'SW-008B',
                'location': 'Floor 3, IDF',
                'issue_type': 'High Temperature',
                'risk_level': 'warning',
                'action': 'Inspect HVAC',
            },
            {
                'id': 3,
                'asset_id': 'PTC-9210',
                'location': 'Data Center Aisle 5',
                'issue_type': 'Signal Loss',
                'risk_level': 'warning',
                'action': 'Monitor',
            },
            {
                'id': 4,
                'asset_id': 'CBL-0452',
                'location': 'Rack 2, Port 8',
                'issue_type': 'Minor Degradation',
                'risk_level': 'low',
                'action': 'Watchlist',
            },
        ]

        logs_data = [
            {
                'id': 1,
                'message': 'Port auto-disabled on SW-007A to prevent cascading failure.',
                'timestamp': '2025-12-15T17:20:11Z',
            },
            {
                'id': 2,
                'message': 'Maintenance ticket #8812 created for CBL-0451.',
                'timestamp': '2025-12-15T12:05:33Z',
            },
        ]

        data = {
            'health': health_data,
            'faults': faults_data,
            'recent_actions': logs_data,
            'contextual_insight': {
                'root_cause_summary': 'Impedance drift detected. Failure probability increasing.',
                'health_trend_label': 'Health Trend (Last 7 Days)',
            }
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
