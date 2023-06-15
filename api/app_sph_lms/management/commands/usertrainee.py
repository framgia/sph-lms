from app_sph_lms.models import Course, LearningPath, User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Assign trainees to Courses or Learning Paths.'

    def add_arguments(self, parser):

        parser.add_argument(
            'email',
            type=str,
            help='Email of trainer'
        )

        parser.add_argument(
            '-c',
            '--course',
            type=str,
            required=False,
            help='Assign trainee to a course. Please wrap the \
                course with double quotes. e.g "Example Course 1"'
        )

        parser.add_argument(
            '-lp',
            '--learning-path',
            type=str,
            required=False,
            help='Assign trainee to a learning path. Please wrap the \
                learning path with double quotes. e.g "Example Leaning Path"'
        )

    def handle(self, *args, **kwargs):
        email = kwargs['email']
        course = kwargs['course']
        learning_path = kwargs['learning_path']
        is_valid = True

        try:
            user = User.objects.get(email=email)
            if user.is_trainer:
                return self.stdout.write(
                    self.style.ERROR(
                        f'User with email {email} is a trainer. \
                            Please use trainee instead.'
                    )
                )
        except User.DoesNotExist:
            return self.stdout.write(
                self.style.ERROR(
                    f'User with email {email} does not exist.'
                )
            )

        if not course and not learning_path:
            self.stdout.write("Can insert both course [ -c | --course ] \
                and learning path [ -lp | --learning-path ] \
                    at the same time.")
            self.stdout.write("Use help [ -h ] for more information.")
            return self.stdout.write(
                self.style.ERROR(
                    'Please specify either a course or a learning path.'
                )
            )

        if course:
            try:
                check_course = Course.objects.get(name=course)

                if check_course.trainee.filter(email=email).exists():
                    self.stdout.write(
                        self.style.WARNING(
                            f'{email} is already enrolled in "{course}".'
                        )
                    )
                    is_valid = False
                else:
                    self.stdout.write(f'Enrolling {email} to {course} . . .')
                    check_course.trainee.add(user)
            except Course.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(
                        f'{course} does not exist.'
                    )
                )
                is_valid = False

        if learning_path:
            try:
                check_learning_path = LearningPath.objects.get(
                        name=learning_path
                    )

                if check_learning_path.trainee.filter(email=email).exists():
                    self.stdout.write(
                        self.style.WARNING(
                            f'{email} is already enrolled \
                                in "{check_learning_path}".'
                        )
                    )
                    is_valid = False
                else:
                    self.stdout.write(
                            f'Enrolling {email} to {learning_path} . . .'
                        )
                    check_learning_path.trainee.add(user)
            except LearningPath.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(
                        f'{course} does not exist.'
                    )
                )
                is_valid = False

        if is_valid:
            return self.stdout.write(
                    self.style.SUCCESS(
                            f'{email} successfully enrolled to \
                                course and/or learning path'
                        )
                )
        else:
            return self.stdout.write(
                    self.style.ERROR(
                            'Process failed, no entry inserted.'
                        )
                )
