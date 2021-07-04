from .models import TodoItem
from rest_framework import serializers

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TodoItem
        fields = ['id','text','checked','date']
        