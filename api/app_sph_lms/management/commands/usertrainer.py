from app_sph_lms.models import User
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Assign trainees to a trainer'

    def add_arguments(self, parser):
        parser.add_argument(
            'email',
            type=str,
            help='Email of trainer'
        )

        parser.add_argument(
            '-at',
            '--assign-trainee',
            type=str,
            nargs='+',
            required=False,
            help='Input trainee '
        )

    def handle(self, *args, **kwargs):
        email = kwargs['email']
        assign_trainee = kwargs['assign_trainee']

        try:
            user = User.objects.get(email=email)
            if not user.is_trainer:
                return self.stdout.write(
                    self.style.ERROR(
                        f'User with email {email} is not a trainer.'
                    )
                )
        except User.DoesNotExist:
            return self.stdout.write(
                self.style.ERROR(
                    f'User with email {email} does not exist.'
                )
            )

        if not assign_trainee:
            raise CommandError(
                    '--assign-trainee (-at) option is \
                    required. Run help for more information.'
                )

        if assign_trainee:
            is_valid = True

            for trainee_email in assign_trainee:
                if ',' in trainee_email:
                    raise CommandError(
                            f'Comma is not allowed in \
                                trainee emails: {trainee_email}.'
                        )

                try:
                    check_user = User.objects.get(email=trainee_email)

                    if check_user.trainer_id is not None \
                            or check_user.is_trainer:
                        self.stdout.write(
                            self.style.WARNING(
                                f'User with email {trainee_email} \
                                    is trainee already.'
                            )
                        )
                        is_valid = False
                except User.DoesNotExist:
                    self.stdout.write(
                        self.style.WARNING(
                            f'User with email {trainee_email} does not exist.'
                        )
                    )
                    is_valid = False

            if is_valid:
                for trainee_email in assign_trainee:
                    self.stdout.write(f'Inserting {trainee_email} . . .')
                    trainee = User.objects.get(email=trainee_email)
                    trainee.trainer_id = user
                    trainee.save()
                return self.stdout.write(
                        self.style.SUCCESS(
                                f'The emails are now trainee of {email}.'
                            )
                    )
            else:
                return self.stdout.write(
                        self.style.ERROR(
                                'Process failed, no entry inserted.'
                            )
                    )
