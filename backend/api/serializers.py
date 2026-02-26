from rest_framework import serializers
from .models import Asset, AutomationLog, HealthScore, SustainabilityMetric


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'


class AutomationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutomationLog
        fields = '__all__'


class HealthScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthScore
        fields = '__all__'


class SustainabilityMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = SustainabilityMetric
        fields = '__all__'
