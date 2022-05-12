from . import bp as api
from app.models import Post
from flask import make_response, g, request, abort
from app.blueprints.auth.auth import token_auth


# @api.route('/post' methods=['GET'])

# Return all the posts the user follows and his own posts
@api.get('/post')
@token_auth.login_required()
def get_posts():
    posts = g.current_user.followed_posts()
    posts = [post.to_dict() for post in posts]
    return make_response({"post":posts},200)

# Get sa single post by id
@api.get('/post/<int:id>')
@token_auth.login_required()
def get_post(id):
    p = Post.query.get(id)
    if not p:
        abort(404)
    #check to see if the user doesn't have access to the post
    if not g.current_user.is_following(p.author) and not p.author.id == g.current_user.id:
        abort(403, description="No No NO Not in My House")
    return make_response(p.to_dict(),200)


# {
#     "body":"The post body"
# }

# Create New Post
@api.post('/post')
@token_auth.login_required()
def post_post():
    posted_data = request.get_json() #this retrieves the payload/body
    post = Post(**posted_data)
    post.save()
    g.current_user.posts.append(post)
    g.current_user.save()
    return make_response(f'Post  id: {post.id} created', 200)

# {
#     "body":"the post body",
# }

# Edit a post
@api.put('/post/<int:id>')
@token_auth.login_required()
def put_post(id):
    put_data = request.get_json()
    post = Post.query.get(id)
    if not post:
        abort(404)
    if not post.author.id == g.current_user.id:
        abort(403)
    post.edit(put_data['body'])
    post.save()
    return make_response(f'Post ID: {post.id} has been changed', 200)

# Delete a Post by its ID
@api.delete('/post/<int:id>')
@token_auth.login_required()
def delete_post(id):
    post = Post.query.get(id)
    # Is this a real post?
    if not post:
        abort(404)
    # check to see if i am allow to delete
    if not post.author.id == g.current_user.id:
        abort(403)
    post.delete()
    return make_response(f"You post with id: {id} was deleted",200)