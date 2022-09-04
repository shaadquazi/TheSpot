from flask import Flask, redirect, request, session
import os

client_id = os.environ.get('SPOTIFY_CLIENT_ID')
client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')

app = Flask(__name__)

from app import routes