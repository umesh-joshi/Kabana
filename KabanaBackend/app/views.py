from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response

class CardView(APIView):

    def get(self, request):
        output = [{"taskid": output.taskid, "title": output.title, "column": output.column}
                  for output in Card.objects.all()]
        return Response(output)

    def post(self, request):

        serializer = CardSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, pk):
        card = Card.objects.get(taskid=pk)
        card.delete()
        return Response("Deleted")

    def put(self, request, pk):
        card = Card.objects.get(taskid=pk)
        serializer = CardSerializer(instance=card, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)        