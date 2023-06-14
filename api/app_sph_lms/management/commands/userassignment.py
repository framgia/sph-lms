from app_sph_lms.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Change User Role Assignment.'

    def add_arguments(self, parser):
        parser.add_argument(
                'email',
                type=str,
                help='Email of user that needs to be updated.'
            )
        parser.add_argument(
                '-cr',
                '--change-role',
                default=False,
                help='Change trainee role to trainer. \
                    If not set or the value is false, \
                    it will only return the current role of the user'
            )

    def handle(self, *args, **kwargs):
        email = kwargs['email']
        change_role = kwargs['change_role']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return self.stdout.write(
                self.style.ERROR(
                    f'User with email {email} does not exist.'
                )
            )

        if (str(change_role).lower() != 'true') and \
                (str(change_role).lower() != 'false'):
            return self.stdout.write(
                self.style.ERROR(
                    'Change role [ -cr | --change-role ] '
                    'must be true or false only'
                )
            )

        if str(change_role).lower() == 'false':
            self.stdout.write("Checking user role . . .")
            return self.stdout.write(
                self.style.SUCCESS(
                    f'{email} is a \
                    {("trainer" if user.is_trainer else "trainee")}.'
                )
            )
        else:
            if user.is_trainer:
                return self.stdout.write(
                    self.style.WARNING(
                        f'{email} is a already a trainer.'
                    )
                )
            else:
                user.is_trainer = 1
                user.trainer_id = None
                user.save()
                return self.stdout.write(
                    self.style.SUCCESS(
                        f'{email} is now set to trainer.'
                    )
                )
