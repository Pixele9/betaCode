from Apps.Archivos.models import Archivo, tipoArchivo, UsuarioArchivo
from rest_framework import serializers

class ArchivoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Archivo
        fields=['id', 'dueño', 'tipoArchivo', 'titulo', 'contenido']

class TipoArchivoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = tipoArchivo
        fields=['id', 'nombre', 'descripcion', 'extension']

class UsuarioArchivoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuarioArchivo
        fields=['id', 'user', 'archivo']
