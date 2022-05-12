from .import bp as api
from app.blueprints.auth.auth import basic_auth
from flask import make_response, g

@api.get('/token')
@basic_auth.login_required()
def get_token():
    token = g.current_user.get_token()
    return make_response({"token":token}, 200)