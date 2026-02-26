from django.db import models


class Asset(models.Model):
    RISK_CHOICES = [
        ('critical', 'Critical'),
        ('warning', 'Warning'),
        ('low', 'Low'),
    ]

    asset_id = models.CharField(max_length=50, unique=True)
    location = models.CharField(max_length=200)
    issue_type = models.CharField(max_length=200)
    risk_level = models.CharField(max_length=20, choices=RISK_CHOICES)
    action = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.asset_id} - {self.issue_type}"

    class Meta:
        ordering = ['-created_at']


class AutomationLog(models.Model):
    message = models.TextField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"{self.timestamp}: {self.message[:50]}"

    class Meta:
        ordering = ['-timestamp']


class HealthScore(models.Model):
    overall_health = models.FloatField(default=96.0)
    active_critical_faults = models.IntegerField(default=5)
    assets_at_risk = models.IntegerField(default=18)
    downtime_risk_avoided = models.DecimalField(max_digits=12, decimal_places=2, default=1200000)
    health_change = models.IntegerField(default=2)  # +2 from yesterday
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at']
        get_latest_by = 'recorded_at'


class SustainabilityMetric(models.Model):
    carbon_emissions_avoided = models.FloatField(default=620.0)  # kg CO2
    asset_life_extended = models.FloatField(default=32.0)  # percentage
    energy_efficiency_gain = models.FloatField(default=14.0)  # percentage
    compliance_status = models.FloatField(default=100.0)  # percentage
    preventive_replacements_count = models.IntegerField(default=4)
    cables_avoided_replacement = models.IntegerField(default=64)
    carbon_saved_kg = models.FloatField(default=620.0)
    last_report_generated = models.DateTimeField(null=True, blank=True)
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at']
        get_latest_by = 'recorded_at'
