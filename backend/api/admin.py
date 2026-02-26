from django.contrib import admin
from .models import Asset, AutomationLog, HealthScore, SustainabilityMetric

admin.site.register(Asset)
admin.site.register(AutomationLog)
admin.site.register(HealthScore)
admin.site.register(SustainabilityMetric)
