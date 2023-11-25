from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.home), # home page
    path("accounts/", include("allauth.urls")),
    path("logout", views.logout_view)
]