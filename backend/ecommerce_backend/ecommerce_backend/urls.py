from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

urlpatterns = [
    path('', lambda request: JsonResponse({'message': 'Welcome to the AI Chat Backend!'})),
    path('admin/', admin.site.urls),
    path('api/', include('chat.urls')),
]
