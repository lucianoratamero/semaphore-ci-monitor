# coding: utf-8

import web
import requests
from ci_settings import settings

urls = (
    '/', 'Index',
    '/api-data', 'api_data'
)


class Index(object):
    def GET(self):
        display_name = settings.DISPLAY_NAME
        render = web.template.render('templates/')
        return render.Index(display_name)


class api_data(object):
    def GET(self):
        url = 'https://semaphoreapp.com/api/v1/projects/'
        data = requests.get(url, data={'auth_token': settings.SEMAPHORE_AUTH_TOKEN})
        web.header('Content-Type', 'application/json')
        return data.content

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()