from . import bp as api
from app.blueprints.auth.auth import token_auth
from flask import request, make_response, g, abort
from .models import *
from helpers import require_admin


############
##
##  CATEGORY API ROUTES
##
############

# Get all categories

@api.get('/category')
def get_category():
    cats=Category.query.all()
    cats_dicts=[cat.to_dict() for cat in cats]
    return make_response({"categories":cats_dicts},200)

# Create new Cat
# {
#     "name":"my cat name"
# }
@api.post('/category')
@token_auth.login_required()
@require_admin
def post_category():
    cat_name = request.get_json().get("name")
    cat = Category(name = cat_name)
    cat.save()
    return make_response(f"category {cat.id} with name {cat.name} created", 200)    
