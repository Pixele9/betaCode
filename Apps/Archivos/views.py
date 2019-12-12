from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK)
from Apps.Archivos.models import Archivo, tipoArchivo, UsuarioArchivo
from Apps.Archivos.serializers import ArchivoSerializer, TipoArchivoSerializer, UsuarioArchivoSerializer
from django.contrib.auth.decorators import login_required
import requests
from django.http import HttpResponse
import json

class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer

class TipoArchivoViewSet(viewsets.ModelViewSet):
    queryset = tipoArchivo.objects.all()
    serializer_class = TipoArchivoSerializer

class UsuarioArchivoViewSet(viewsets.ModelViewSet):
    queryset = UsuarioArchivo.objects.all()
    serializer_class = UsuarioArchivoSerializer


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def inicio(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if username is None or password is None:
        return Response({'Error':'Favor de completar los campos'}, status=HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    

    if not user:
        return Response({"Error":"Credenciales no validas"}, status=HTTP_404_NOT_FOUND)

    login(request, user)
    token, created = Token.objects.get_or_create(user=user)

    request.session['token'] = str(token)
    return Response({"Exito":"Correcto"}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def registro(request):
    username = request.data.get("username")
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name") 
    email = request.data.get("email")
    password = request.data.get("password")

    if username=="" or first_name=="" or last_name=="" or email=="" or password=="":
        print("a")
        return Response({"Error":"Favor de completar todos los campos"}, status=HTTP_400_BAD_REQUEST)
    else:
        if User.objects.filter(email=email).exists():
            print("b")
            return Response({"Error": "El correo ya ha sido usado"}, status=HTTP_400_BAD_REQUEST)
        elif len(password)<6:
            print("c")
            return Response({"Error": "La contraseña debe tener minimo 6 caracteres"}, status=HTTP_400_BAD_REQUEST)
        elif len(username)<4:
            print(len(username))
            print("d")
            return Response({"Error": "El usuario debe tener minimo 4 caracteres "}, status=HTTP_400_BAD_REQUEST)
        else:
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_password(password)
                user.email=email
                user.save()
                return Response({"Registrado": "Usuario registrado exitosamente"}, status=HTTP_200_OK)
            else:
                print("e")
                return Response({"Error": "El usuario ya existe"}, status=HTTP_400_BAD_REQUEST)

@login_required
def loginn(request):
    return render(request, "login.html")

def register(request):
    return render(request, "signup.html")

def forgot(request):
    return render(request, "pass.html")

def index(request):
    return render(request, "index2.html")

def compiler(request):
    url = "https://ide.geeksforgeeks.org/main.php"
    settings = request.POST.get("settings")
    settings = json.loads(settings)
    
    code = request.POST.get("code2Compile")
    print(settings)
    settings['code'] = code.replace(u'\xa0', u' ')

    print(settings["code"])
    req = requests.post(url, settings)
    print(req.json())
    res = req.json()
    print(res["output"])
    return HttpResponse(res["output"])