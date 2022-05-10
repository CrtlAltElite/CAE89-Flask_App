
from .import bp as social
from flask import render_template, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Post

# ROUTES
@social.route('/', methods = ['GET', 'POST'])
@login_required
def index():
    if request.method == 'POST':
        body = request.form.get('body')
        new_post=Post(body=body, user_id=current_user.id)
        new_post.save()
        return redirect(url_for('social.index'))
    posts=current_user.followed_posts()
    return render_template('index.html.j2',posts=posts)


@social.route('/post/<int:id>')
@login_required
def get_a_post(id):
    post = Post.query.get(id)
    return render_template('single_post.html.j2', post=post, view_all=True)