# my_project/urls.py

from django.contrib import admin
from django.urls import path, include

# Add the following lines:
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main_app.urls')),
    # ... (other paths)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Add the following lines at the end of the file:
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
