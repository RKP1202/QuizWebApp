from django.shortcuts import render, redirect
from .models import Question, Student
from django.contrib import messages
import random

# Starting the quiz
def start_quiz(request):
    random_question = Question.objects.order_by('?').first()

    options = random_question.options.all()

    context = {
        'question': random_question,
        'options': options,
    }
    return render(request, 'quiz/question.html', context)


def has_taken_quiz(request):
    if request.method == "POST":
        username = request.POST.get("username").upper()
        student, created = Student.objects.get_or_create(username=username)

        if student.status == "done":
            messages.error(request, f'{username} has already taken the quiz.')
            return redirect('start_quiz')

        messages.success(request, "Proceed to take your quiz.")
        return redirect('start_quiz')

#  quiz submission
def submit_quiz(request):
    if request.method == "POST":
        username = request.POST.get("username").upper()
        score = int(request.POST.get("score"))
        
        student = Student.objects.get(username=username)
        student.score = score
        student.status = "done"
        student.save()

        return redirect('quiz_submitted')  

def quiz_submitted(request):
    return render(request, 'quiz/submission_success.html')
