from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('detection/', views.detection, name='detection'),
    path('predict/', views.detect_attack, name='detect_attack'),  # <-- NEW
]
