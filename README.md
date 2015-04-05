
# semaphore-ci-monitor

![semaphore-ci-monitor](http://i19.photobucket.com/albums/b164/lucianoratamero/YourCompany_CI.png)

this is a simple, python based CI monitor for Semaphore.
you can run it locally to keep an eye on your projects statuses.
it uses twitter bootstrap and is mobile ready. :)

## setup

to set it up, you need a couple of things installed:

- python 2.7.x
- pip

then install requirements via pip:

```
pip install -r requirements.txt
```

## usage

to use it, just run it as a python script:

```
python ci.py
```

the default port is 8080, but you can customize it:

```
python ci.py 1234
```

## configuration

to use this CI monitor, you'll need to get your Semaphore Auth Token, found at the API tab of one of your projects after logging into Semaphore:

![semaphore api token](http://i19.photobucket.com/albums/b164/lucianoratamero/Screenshotfrom2014-12-31191053.png)

and set it in settings.py, found at 'ci_settings' folder:


```
SEMAPHORE_AUTH_TOKEN = '{your_api_token}'
```

if you want, you can customize the DISPLAY_NAME in this file. :)

that's all, folks!
