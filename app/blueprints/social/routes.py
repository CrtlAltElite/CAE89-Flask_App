
from .import bp as social
from flask import render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from app.models import Post, User

# ROUTES
@social.route('/index', methods = ['GET', 'POST'])
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

@social.route('/show_users')
def show_users():

    users=User.query.filter(User.id != current_user.id).all()
    return render_template('show_users.html.j2', users=users)

@social.route('/follow/<int:id>')
@login_required
def follow(id):
    user=User.query.get(id)
    current_user.follow(user)
    flash(f"You are now following {user.first_name} {user.last_name}", "success")
    return redirect(url_for("social.show_users"))    

@social.route('/unfollow/<int:id>')
@login_required
def unfollow(id):
    user=User.query.get(id)
    current_user.unfollow(user)
    flash(f"You are no longer following {user.first_name} {user.last_name}", "success")
    return redirect(url_for("social.show_users"))    

@social.route('/post/my_posts')
@login_required
def my_posts():
    # Get all the posts for the person using my site
    # Post.query.filter(id = current_user.id).all()
    return render_template('my_posts.html.j2', posts=current_user.posts)

@social.route('/edit_post/<int:id>', methods=['GET','POST'])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    if post and post.author.id != current_user.id:
        flash('GTFO you freaking hacker!', 'danger')
        redirect(url_for('social.index'))
    if request.method=='POST':
        post.edit(request.form.get('body'))
        post.save()
        flash("Your post has been edited", "success")
        return redirect(url_for('social.index'))
    return render_template('edit_post.html.j2',post=post)

@social.route('/delete_post/<int:id>')
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post and post.author.id != current_user.id:
        flash('GTFO you freaking hacker!', 'danger')
        return redirect(url_for('social.index'))
    post.delete()
    flash('You removed the evidence', 'info')
    return redirect(request.referrer or url_for('social.index'))