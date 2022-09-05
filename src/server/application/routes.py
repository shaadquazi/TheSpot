from application import application, redirect, request, client_id, client_secret
import uuid
import requests
import base64

def stringToBase64(baseString):
    bytes = baseString.encode('ascii')
    base64_bytes = base64.b64encode(bytes)
    base64_message = base64_bytes.decode('ascii')
    return base64_message

@application.route('/')
def index():
    return "Welcome, this is THE SPOT's Middleware!"

@application.route('/authorize')
def authorize():    
    state = uuid.uuid4()
    scope = "user-read-email user-top-read user-library-read"
    
    endpoint = "https://accounts.spotify.com/authorize"    
    payload = {
        'client_id': client_id,
        'response_type': "code",
        'redirect_uri': f"{request.url_root}callback",
        'state': state,
        'scope': scope,
        'show_dialog': True
    }    
    
    response = requests.get(endpoint, params=payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return redirect(response.url, code=302)

@application.route('/callback')
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


usersOnline = {}
@application.route('/users', methods=['GET', 'POST', 'DELETE'])
def users():
    if request.method == 'POST':
        data = request.get_json()
        user = {
            'id': data['id'],
            'display_name': data['display_name'],
            'url': data['images'][0]['url']
        }
        usersOnline[user['id']] = user
        return user, 201
    elif request.method == 'DELETE':
        id = request.args.get('id')
        if id:
            user = usersOnline.get(id)
            usersOnline.pop(id)
            return user, 200
        return {'error': 'Please provide user.id'}, 400
    else:
        if usersOnline:
            return {'users': usersOnline}, 200
        else:
            return {'users': {}}, 200

globalQueue = {}
@application.route('/queue', methods=['GET', 'POST', 'DELETE'])
def queue():
    if request.method == 'POST':
        data = request.get_json()
        globalQueue[data['id']] = data
        return data, 201
    elif request.method == 'DELETE':
        id = request.args.get('id')
        if id:
            track = globalQueue.get(id)
            globalQueue.pop(id)
            return track, 200
        return {'error': 'Please provide track.id'}, 400
    else:
        if globalQueue:
            return {'queue': globalQueue}, 200
        else:
            return {'queue': {}}, 200