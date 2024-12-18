from django.urls import path 
from . import views

urlpatterns = [
    path("api/questions/", views.questions, name="questions"),
    path("api/has_taken_quiz/", views.has_taken_quiz, name="has_taken_quiz"),
    path("api/submit_quiz/", views.submit_quiz, name="submit_quiz")

]