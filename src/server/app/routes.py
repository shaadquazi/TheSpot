from app import app

@app.route('/')
def index():
    return "Welcome, this is THE SPOT's Middleware!"