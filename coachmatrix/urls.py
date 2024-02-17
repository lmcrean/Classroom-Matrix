# coachmatrix/urls.py 
# this is the main URL configuration for the project. It is the first thing that is read when the server is started. It is responsible for routing requests to the appropriate app.

from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),  # Include the allauth app URLs
    path('', include('users.urls')),  # Include the users app URLs at the root
    path('', include('main_forum.urls')), 
]