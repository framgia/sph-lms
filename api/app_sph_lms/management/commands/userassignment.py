from app_sph_lms.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Change User Role Assignment'

    def add_arguments(self, parser):
        parser.add_argument(
                'email',
                type=str,
                help='Email of user that needs to be updated'
            )
        parser.add_argument(
                '-r',
                '--role',
                default='trainer',
                help='Define user role. Trainer by default'
            )

    def handle(self, *args, **kwargs):
        email = kwargs['email']
        role = kwargs['role']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return self.stdout.write(
                    self.style.ERROR(
                            f'User with email {email} does not exist.'
                        )
                )

        if role != 'trainer' and role != 'trainee':
            return self.stdout.write(
                self.style.WARNING(
                    'Role must be "trainer" or "trainee".'
                )
            )

        if (user.is_trainer and role == 'trainer') or \
                (not user.is_trainer and role == 'trainee'):
            return self.stdout.write(
                self.style.WARNING(
                    f'Role for {email} is already set to {role}.'
                )
            )
        else:
            user.is_trainer = role == 'trainer'
            user.save()
            return self.stdout.write(
                    self.style.SUCCESS(
                        f'Role for {email} has been updated to {role}'
                    )
                )
