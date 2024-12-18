from django.urls import path
from django.http import HttpResponse
from . import views

# Root view for testing purposes
def home(request):
    return HttpResponse("Welcome to QuizApp!")

urlpatterns = [
    path("", home, name="home"),  # Root URL endpoint
    path("api/questions/", views.questions, name="questions"),
    path("api/has_taken_quiz/", views.has_taken_quiz, name="has_taken_quiz"),
    path("api/random-questions/", views.get_random_questions, name="random_questions"),
    path("api/submit_quiz-results/", views.submit_quiz_results, name="submit_quiz_results"),
]
