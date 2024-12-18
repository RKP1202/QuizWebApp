from django.urls import path 
from . import views

urlpatterns = [
    path("api/questions/", views.questions, name="questions"),
    path("api/has_taken_quiz/", views.has_taken_quiz, name="has_taken_quiz"),
    path('api/random-questions/', views.get_random_questions, name='random_questions'),
    path('api/submit_quiz-results/', views.submit_quiz_results, name='submit_quiz_results'),
]