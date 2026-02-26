from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, datetime, timezone as dt_timezone
from api.models import Asset, AutomationLog, HealthScore, SustainabilityMetric


class Command(BaseCommand):
    help = 'Seed the database with mock data for the dashboard'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # Clear existing data
        Asset.objects.all().delete()
        AutomationLog.objects.all().delete()
        HealthScore.objects.all().delete()
        SustainabilityMetric.objects.all().delete()

        # Create health score
        HealthScore.objects.create(
            overall_health=96.0,
            active_critical_faults=5,
            assets_at_risk=18,
            downtime_risk_avoided=1200000.00,
            health_change=2,
        )

        # Create faults matching the screenshot
        faults = [
            {
                'asset_id': 'CBL-0451',
                'location': 'Rack 2, Port 7',
                'issue_type': 'Impedance Drift',
                'risk_level': 'critical',
                'action': 'Replace Cable',
            },
            {
                'asset_id': 'SW-008B',
                'location': 'Floor 3, IDF',
                'issue_type': 'High Temperature',
                'risk_level': 'warning',
                'action': 'Inspect HVAC',
            },
            {
                'asset_id': 'PTC-9210',
                'location': 'Data Center Aisle 5',
                'issue_type': 'Signal Loss',
                'risk_level': 'warning',
                'action': 'Monitor',
            },
            {
                'asset_id': 'CBL-0452',
                'location': 'Rack 2, Port 8',
                'issue_type': 'Minor Degradation',
                'risk_level': 'low',
                'action': 'Watchlist',
            },
        ]

        for fault in faults:
            Asset.objects.create(**fault)

        # Create automation logs
        now = timezone.now()
        logs = [
            {
                'message': 'Port auto-disabled on SW-007A to prevent cascading failure.',
                'timestamp': now - timedelta(hours=2),
            },
            {
                'message': 'Maintenance ticket #8812 created for CBL-0451.',
                'timestamp': now - timedelta(hours=5),
            },
        ]

        for log in logs:
            AutomationLog.objects.create(**log)

        # Create sustainability metric
        SustainabilityMetric.objects.create(
            carbon_emissions_avoided=620.0,
            asset_life_extended=32.0,
            energy_efficiency_gain=14.0,
            compliance_status=100.0,
            preventive_replacements_count=4,
            cables_avoided_replacement=64,
            carbon_saved_kg=620.0,
            last_report_generated=datetime(2025, 12, 1, 14, 32, tzinfo=dt_timezone.utc),
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
