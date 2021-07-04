from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from .serializers import TodoSerializer
from rest_framework import viewsets,permissions
from .models import TodoItem
from django.views.generic.list import ListView

class TodoViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoSerializer
    
    def create(self,validatedata):
        print(validatedata.POST)
        TodoItem(text = validatedata.POST['text']).save()
        return Response(validatedata.data   )
    def update(self,request,pk):
        todo = TodoItem.objects.get(pk = pk)
        print(request.data)
        if 'text' in request.data:
            todo.text = request.data['text']
        if request.data['checked'] =='false':
            todo.checked = False
        else:
            todo.checked = True
        
        
        todo.save()
        return Response(request.data)

class TodoView(ListView):
    model = TodoItem
    template_name='index.html'