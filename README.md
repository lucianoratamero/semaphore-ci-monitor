
# semaphore-ci-monitor

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

## configuration

you'll find a settings.py file on ci_settings folder. in it, change the SEMAPHORE_AUTH_TOKEN value to your Semaphore API auth_token and, if you want, customize the DISPLAY_NAME to your needs.

## usage

to use it, just run it as a python script:

```
python ci.py
```

the default port is 8080, but you can customize it:

```
python ci.py 1234
```

that's all, folks!
