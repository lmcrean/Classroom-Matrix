from django.shortcuts import render, redirect
from django.contrib.auth import logout


def home(request):
    return render(request, "index.html")

def logintoquestions(request):
    return redirect("questions.html")

def logout_view(request):
    logout (request)
    return redirect("index.html")