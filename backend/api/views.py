from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Asset, AutomationLog, HealthScore, SustainabilityMetric
from .serializers import AssetSerializer, AutomationLogSerializer


@api_view(['GET'])
def operations_dashboard(request):
    """Return all data needed for the Operations Dashboard."""
    # Get latest health score or provide defaults
    try:
        health = HealthScore.objects.latest()
        health_data = {
            'overall_health': health.overall_health,
            'active_critical_faults': health.active_critical_faults,
            'assets_at_risk': health.assets_at_risk,
            'downtime_risk_avoided': float(health.downtime_risk_avoided),
            'health_change': health.health_change,
        }
    except HealthScore.DoesNotExist:
        health_data = {
            'overall_health': 96.0,
            'active_critical_faults': 5,
            'assets_at_risk': 18,
            'downtime_risk_avoided': 1200000.00,
            'health_change': 2,
        }

    # Get faults
    faults = Asset.objects.all()[:10]
    faults_data = AssetSerializer(faults, many=True).data

    # Get recent automation logs
    logs = AutomationLog.objects.all()[:5]
    logs_data = AutomationLogSerializer(logs, many=True).data

    return Response({
        'health': health_data,
        'faults': faults_data,
        'recent_actions': logs_data,
        'contextual_insight': {
            'root_cause_summary': 'Impedance drift detected. Failure probability increasing.',
            'health_trend_label': 'Health Trend (Last 7 Days)',
        }
    })


@api_view(['GET'])
def sustainability_dashboard(request):
    """Return all data needed for the Sustainability & Compliance Dashboard."""
    try:
        metric = SustainabilityMetric.objects.latest()
        data = {
            'carbon_emissions_avoided': metric.carbon_emissions_avoided,
            'asset_life_extended': metric.asset_life_extended,
            'energy_efficiency_gain': metric.energy_efficiency_gain,
            'compliance_status': metric.compliance_status,
            'preventive_replacements_count': metric.preventive_replacements_count,
            'cables_avoided_replacement': metric.cables_avoided_replacement,
            'carbon_saved_kg': metric.carbon_saved_kg,
            'last_report_generated': metric.last_report_generated.isoformat() if metric.last_report_generated else None,
        }
    except SustainabilityMetric.DoesNotExist:
        data = {
            'carbon_emissions_avoided': 620.0,
            'asset_life_extended': 32.0,
            'energy_efficiency_gain': 14.0,
            'compliance_status': 100.0,
            'preventive_replacements_count': 4,
            'cables_avoided_replacement': 64,
            'carbon_saved_kg': 620.0,
            'last_report_generated': '2025-12-01T14:32:00',
        }

    return Response({
        'metrics': data,
        'lifecycle_insight': f"Preventive maintenance on {data['cables_avoided_replacement']} cables avoided early replacement, saving {data['carbon_saved_kg']} kg of embodied carbon.",
    })
