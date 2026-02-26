from django.urls import path
from . import views

urlpatterns = [
    path('operations/', views.operations_dashboard, name='operations-dashboard'),
    path('sustainability/', views.sustainability_dashboard, name='sustainability-dashboard'),
]
