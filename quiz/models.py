from django.db import models

# Create your models here.
class Student(models.Model):
    StatusOptions = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    username = models.CharField(max_length=20, unique=True)
    score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default="active" , choices=StatusOptions)
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class Question(models.Model):
    question = models.CharField(max_length=500, unique=True , db_index=True)

    def __str__(self):
        return self.question


class QuestionOption(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    option = models.CharField(max_length=300)
    is_correct = models.BooleanField(default=False)
    

    def __str__(self):
        return f"{self.option} for {self.question.question}"



