from . import bp as api
from app.blueprints.auth.auth import token_auth
from flask import request, make_response, g, abort
from .models import *
from helpers import require_admin
import stripe
import os
from collections import Counter
############
##
##  Stripe API ROUTES
##
############


# This is your test secret API key.
stripe.api_key = os.environ.get('STRIPE_SK')
YOUR_DOMAIN = os.environ.get('HOST_ADDRESS')



@api.route('/create-checkout-session', methods=['POST'])
@token_auth.login_required()
def create_checkout_session():
    data=request.get_json()
    cart=data.get('cart')
    user=data.get('user')
    line_items=[]
    filtered_ids=map(lambda item: item['id'],cart)
    item_counts=Counter(filtered_ids)

    for item in cart:
        if item['id'] in item_counts:
            line_items.append({
                'name':item['name'],
                'amount':int(float(item['price'])*100),
                'quantity':item_counts[item['id']],
                'currency':'USD'
            })
            del item_counts[item['id']]

    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email=user['email'],
            billing_address_collection='auto',
            shipping_address_collection={
              'allowed_countries': ['US', 'CA'],
            },
            line_items=line_items,
            mode='payment',
            success_url=YOUR_DOMAIN + 'checkoutsuccess',
            cancel_url=YOUR_DOMAIN + 'cart/true',
            automatic_tax={'enabled': True},
        )
    except Exception as e:
        return str(e)

    return make_response({"url":checkout_session.url},200)

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

#{
#   "name":"New Cat NAME"
#}
@api.put('/category/<int:id>')
@token_auth.login_required()
@require_admin
def put_category(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat_name = request.get_json().get("name")
    cat.name=cat_name
    cat.save()
    return make_response(f"Category {cat.id} has a new name: {cat.name}", 200)

# Delete A Category
@api.delete('/category/<int:id>')
@token_auth.login_required()
@require_admin
def delete_category(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat.delete()
    return make_response(f"Category {id} has been deleted", 200)


#############
##
##  ITEM API ROUTES
##
############

# Get all items from the shop
@api.get('/item')
def get_items():
    # Get all the items in the db
    items = Item.query.all()
    # Turn items to dictionary
    items_dicts= [item.to_dict() for item in items]
    # return the response
    return make_response({"items":items_dicts},200)

# Get an item by its id
@api.get('/item/<int:id>')
def get_item(id):
    # Look up the item in the database
    item = Item.query.get(id)
    # Verify it exists
    if not item:
        abort(404)
    # Turn item into Dictionary
    item_dict = item.to_dict()
    # return Response
    return make_response(item_dict,200)

# Get all items in a Category (by cat id)
@api.get('/item/category/<int:id>')
def get_items_by_cat(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    all_items_in_cat = [item.to_dict() for item in cat.products]
    return make_response({"items":all_items_in_cat}, 200)

# Creating a New Item
# {
#     "name":"String",
#     "desc":"String",
#     "price":"Float",
#     "img":"String",
#     "category_id":"int"
# }
@api.post("/item")
@token_auth.login_required()
@require_admin
def post_item():
    # Get the Payload from the request
    item_dict = request.get_json()
    # Ensure the payload has all the approiate values
    if not all(key in item_dict for key in ('name','desc','price','img','category_id')):
        abort(400)
    # Create an empty Item
    item = Item()
    # SEt the attributes of that item to the payload
    item.from_dict(item_dict)
    # Save Item
    item.save()
    # Send response
    return make_response(f"Item {item.name} was created with an id {item.id}",200)

# some sort of dict {}
@api.put("/item/<int:id>")
@token_auth.login_required()
@require_admin
def put_item(id):
    item_dict = request.get_json()
    item = Item.query.get(id)
    if not item:
        abort(404)
    item.from_dict(item_dict)
    item.save()
    return make_response(f"Item {item.name} with ID {item.id} has been updated", 200)

# Delete a Item by ID
@api.delete('/item/<int:id>')
@token_auth.login_required()
@require_admin
def delete_item(id):
    item_to_delete = Item.query.get(id)
    if not item_to_delete:
        abort(404)
    item_to_delete.delete()
    return make_response(f"Item with id: {id} has been delted", 200)
