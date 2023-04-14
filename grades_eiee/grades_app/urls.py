from django.urls import path
from .views import SCCView

urlpatterns = [
    path('scc/', SCCView.as_view(), name='scc'),
    path('scc/<int:id>', SCCView.as_view(), name='scc_id'),
]