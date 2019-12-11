from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Archivo(models.Model):
    dueño = models.ForeignKey(User, on_delete=models.CASCADE)
    tipoArchivo = models.ForeignKey('tipoArchivo', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100, null=False)
    contenido = models.TextField(null=True)

class tipoArchivo(models.Model):
    nombre = models.CharField(max_length=20, null=False)
    descripcion = models.CharField(max_length=100, null=False)
    extension = models.CharField(max_length=2, null=False)
    
class UsuarioArchivo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    archivo = models.ForeignKey('Archivo', on_delete=models.CASCADE)