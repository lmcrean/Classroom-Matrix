# main_forum/models.py

# this file will contain the models for the main_forum app. The models will include the Question, Answer, Upvote, Downvote, UserProfile, and Bookmark classes.

from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from django.utils import timezone
from datetime import timedelta
from django.utils.text import slugify
from django_quill.fields import QuillField
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from taggit.managers import TaggableManager
from .question_model import Question
from .user_profile_model import User

STATUS = ((0, "Draft"), (1, "Published"))

class Answer(models.Model):
    """
    The Answer model will store the answers to the questions. Users can upvote or downvote answers. The answers will be ordered by the most upvoted answers first, then by the date they were created.
    """
    question = models.ForeignKey(Question, on_delete=models.CASCADE,
                             related_name="answers")
    slug = models.SlugField(max_length=200, unique=True)
    name = models.CharField(max_length=80)
    email = models.EmailField()
    body = QuillField()
    created_on = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    upvotes = models.ManyToManyField(
        User, related_name='answer_upvote', blank=True)
    downvotes = models.ManyToManyField(User, related_name='answer_downvote', blank=True)
    status = models.IntegerField(choices=STATUS, default=0)
    answercount = models.IntegerField(default=0)
    featured_image = CloudinaryField('image', default='placeholder')
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return f"Answer {self.body} by {self.name}"

    def number_of_upvotes(self):
        return self.upvotes.count()
    
    def number_of_downvotes(self):
        return self.downvotes.count()
    
    def total_votes(self):
        return self.number_of_upvotes() - self.number_of_downvotes()

    def save(self, *args, **kwargs):
        if not self.slug:  # if slug is not set or empty
            base_slug = slugify(self.name) if self.name else 'answer'  # Fallback to 'answer' if name is empty
            new_slug = base_slug
            counter = 1

            while Answer.objects.filter(slug=new_slug).exists():  # Ensure uniqueness
                new_slug = f'{base_slug}-{counter}'
                counter += 1

            self.slug = new_slug or uuid.uuid4().hex[:6]  # Set a UUID if all else fails

        super(Answer, self).save(*args, **kwargs)