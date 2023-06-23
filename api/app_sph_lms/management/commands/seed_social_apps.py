import json
import os

from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Seed social applications from fixture file'

    def handle(self, *args, **options):
        fixture_file = 'app_sph_lms/fixtures/social_app_seeder.json'

        with open(fixture_file) as f:
            fixture = json.load(f)

        client_id = os.getenv('GOOGLE_CLIENT_ID')
        client_secret = os.getenv('GOOGLE_CLIENT_SECRET')
        site = Site.objects.get(domain='example.com')

        for item in fixture:
            fields = item['fields']
            fields['client_id'] = client_id
            fields['secret'] = client_secret
            provider = fields.pop('provider', None)
            name = fields.pop('name', None)

            social_app = SocialApp(provider=provider, name=name, **fields)
            social_app.save()
            social_app.sites.add(site)

        self.stdout.write(
            self.style.SUCCESS(
                    'Social applications seeded successfully.'
                )
            )
