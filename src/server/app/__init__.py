from flask import Flask, redirect, request, session

app = Flask(__name__)

from app import routes