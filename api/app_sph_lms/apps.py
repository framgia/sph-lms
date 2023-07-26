from django.apps import AppConfig


class AppSphLmsConfig(AppConfig):
    name = 'app_sph_lms'

    def ready(self):
        import app_sph_lms.signals
