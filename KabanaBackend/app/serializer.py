from rest_framework import serializers
from . models import *

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['taskid', 'title', 'column']