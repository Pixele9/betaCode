from django.contrib import admin
from django.urls import path, include
from Apps.Archivos import views as views_archivos

urlpatterns = [
    path('', views_archivos.loginn, name="loginn"),
    path('register', views_archivos.register, name="register"),
    path('forgot', views_archivos.forgot, name="forgot"),

    path('index', views_archivos.index, name="index"),
    path('compiler', views_archivos.compiler, name="compiler"),

]