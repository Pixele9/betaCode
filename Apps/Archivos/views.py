from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
# from rest_framework.decorators import action
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from django.db.models import Q

from Apps.Archivos.models import Archivo, tipoArchivo, UsuarioArchivo
from Apps.Archivos.serializers import ArchivoSerializer, TipoArchivoSerializer, UsuarioArchivoSerializer

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
    print(created, token)
    return Response({ "id":str(user.id), "token":token.key}, status=HTTP_200_OK)


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
        return Response({"Error":"Favor de completar todos los campos"}, status=HTTP_400_BAD_REQUEST)
    else:
        if User.objects.filter(email=email).exists():
            return Response({"Error": "El correo ya ha sido usado"}, status=HTTP_400_BAD_REQUEST)
        elif len(password)<6:
            return Response({"Error": "La contraseña debe tener minimo 6 caracteres"}, status=HTTP_400_BAD_REQUEST)
        elif len(username)<4:
            return Response({"Error": "El usuario debe tener minimo 4 caracteres "}, status=HTTP_400_BAD_REQUEST)
        else:
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_password(password)
                user.email=email
                user.save()
                return Response({"Registrado": "Usuario registrado exitosamente"}, status=HTTP_200_OK)
            else:
                return Response({"Error": "El usuario ya existe"}, status=HTTP_400_BAD_REQUEST)


def loginn(request):
    return render(request, "login.html")

def register(request):
    return render(request, "signup.html")
