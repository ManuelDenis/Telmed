from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=300, null=True, blank=True)
    dis = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
