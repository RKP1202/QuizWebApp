from django.shortcuts import render
from .models import Question, Student
from .serializers import QuestionSerializer
from rest_framework.response import Response 
from rest_framework.decorators import api_view
import random

# Create your views here

@api_view(['GET'])
def get_random_questions(request):
    try:
        num_questions = int(request.query_params.get('num_questions', 10))
        
        total_questions = Question.objects.count()
        
        if total_questions < num_questions:
            questions = Question.objects.all()
        else:
            questions = Question.objects.order_by('?')[:num_questions]
        
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def questions(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def has_taken_quiz(request):
    username = request.data.get("username")
    if not username:
        return Response({"error": "username is necessary"}, status=400)
    username = username.upper()
    student, created = Student.objects.get_or_create(username=username)
    if student.status == "done":
        return Response({"error": f'{username} has taken the quiz already'}, status=403)
    return Response({"message": "Proceed to take your quiz"})


# @api_view(['POST'])
# def submit_quiz_results(request):
#     username = request.data.get("username")
#     username = username.upper()
#     score = request.data.get("score")
#     student = Student.objects.get(username=username)
#     student.score = score 
#     student.status = "done"
#     student.save()
#     return Response({"Quiz submitted successfully!"})

@api_view(['POST'])
def submit_quiz_results(request):
    username = request.data.get("username", "").upper()
    score = request.data.get("score")
    total_questions = request.data.get("total_questions")
    correct_answers = request.data.get("correct_answers")
    
    
    student = Student.objects.get(username=username)
        
    student.score = score
    student.status = "done"
    student.save()
        
    return Response({
            "message": "Quiz submitted successfully!",
            "total_questions": total_questions,
            "correct_answers": correct_answers
        })
