from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=SocialAccount)
def set_default_password(sender, instance, created, **kwargs):
    if created and instance.provider == 'google':
        instance.user.password = make_password("password")
        instance.user.save()
