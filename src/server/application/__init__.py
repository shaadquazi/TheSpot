from flask import Flask, redirect, request, session
from flask_cors import CORS
import os

client_id = os.environ.get('SPOTIFY_CLIENT_ID')
client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')
env = os.environ.get('FLASK_ENV')
baseReactURL = ''
if env == 'development':
    baseReactURL = os.environ.get('REACT_APP_LOCAL_ENDPOINT')
else:
    baseReactURL = os.environ.get('REACT_APP_ENDPOINT')

application = Flask(__name__)
CORS(application)

from application import routes
