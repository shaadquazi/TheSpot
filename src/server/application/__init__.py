from flask import Flask, redirect, request, session
import os

client_id = os.environ.get('SPOTIFY_CLIENT_ID')
client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')

application = Flask(__name__)

from application import routes
