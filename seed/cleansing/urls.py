"""
:copyright: (c) 2015
"""

from django.conf.urls import patterns, url

urlpatterns = patterns(
    'seed.cleansing.views',
    url(r'results/', 'get_cleansing_results', name='get_cleansing_results'),
)