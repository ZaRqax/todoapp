from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('',views.TodoViewSet)


urlpatterns =[
    path('api/', include(router.urls) ),
    path('api-auth',include('rest_framework.urls', namespace='rest_framework')),
    path('',views.TodoView.as_view(),name='main_page'),

]
