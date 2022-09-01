from app import app, redirect, request, session
import uuid
import requests
import base64

def stringToBase64(baseString):
    bytes = baseString.encode('ascii')
    base64_bytes = base64.b64encode(bytes)
    base64_message = base64_bytes.decode('ascii')
    return base64_message

@app.route('/')
def index():
    return "Welcome, this is THE SPOT's Middleware!"

@app.route('/authorize')
def authorize():    
    state = uuid.uuid4()    
    
    endpoint = "https://accounts.spotify.com/authorize"    
    payload = {
        'client_id': client_id,
        'response_type': "code",
        'redirect_uri': f"{request.url_root}callback",
        'state': state,
        'show_dialog': True
    }    
    
    response = requests.get(endpoint, params=payload)
    return redirect(response.url, code=302)

@app.route('/callback')
def callback():
    code = request.args.get('code')
    error = request.args.get('error')
    state = request.args.get('state') # Can be used to validate

    if code != None:
        endpoint = "https://accounts.spotify.com/api/token"
        payload = {
            'grant_type': "authorization_code",
            'code': code,
            'redirect_uri': f"{request.url_root}callback"
        } 
            
        client = client_id + ":" + client_secret
        base64_message = stringToBase64(client)

        headers = {            
            "Authorization": f"Basic {base64_message}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
        response = requests.post(endpoint, params=payload, headers=headers)
        print("Response:  ", response)
        return response.json(), 200        
    else:
        return {'error': error}, 403