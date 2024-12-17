from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Question, Student
import json

@csrf_exempt
def questions(request):
    if request.method == 'GET':
        questions = Question.objects.all().values()
        return JsonResponse(list(questions), safe=False)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def has_taken_quiz(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get("username", "").strip().upper()

            if not username:
                return JsonResponse({"error": "Username is required!"}, status=400)

            student, created = Student.objects.get_or_create(username=username)

            if student.status == "done":
                return JsonResponse({"error": f"{username} has already taken the quiz."}, status=403)

            return JsonResponse({"message": "Proceed to take your quiz"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def submit_quiz(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get("username", "").strip().upper()
            score = data.get("score", None)

            if not username or score is None:
                return JsonResponse({"error": "Username and score are required!"}, status=400)

            try:
                score = int(score)
            except ValueError:
                return JsonResponse({"error": "Invalid score value!"}, status=400)

            student = get_object_or_404(Student, username=username)
            student.score = score
            student.status = "done"
            student.save()

            return JsonResponse({"message": "Quiz submitted successfully!"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
