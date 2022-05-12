from app import db, login
from flask_login import UserMixin # IS ONLY FOR THE USER MODEL!!!!
from datetime import datetime as dt, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id')),
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name =  db.Column(db.String)
    email =  db.Column(db.String, unique=True, index=True)
    password =  db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    icon = db.Column(db.Integer)
    posts = db.relationship('Post', backref='author', lazy="dynamic")
    followed = db.relationship('User',
            secondary = followers,
            primaryjoin=(followers.c.follower_id == id),
            secondaryjoin=(followers.c.followed_id ==id),
            backref=db.backref('followers', lazy='dynamic'),
            lazy ='dynamic'
            )
    token = db.Column(db.String, index=True, unique=True)
    token_exp = db.Column(db.DateTime)

    ##################################################
    ############## Methods for Token auth ############
    ##################################################
    def get_token(self, exp=86400):
        current_time = dt.utcnow()
        # give the user their back token if their is still valid
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        # if the token DNE or is exp
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(seconds=exp)
        self.save()
        return self.token

    def revoke_token(self):
        self.token_exp = dt.utcnow() - timedelta(seconds=61)
    
    @staticmethod
    def check_token(token):
        u  = User.query.filter_by(token=token).first()
        if not u or u.token_exp < dt.utcnow():
            return None
        return u


    #########################################
    ############# End Methods for tokens ####
    #########################################

    # should return a unique identifing string
    def __repr__(self):
        return f'<User: {self.email} | {self.id}>'

    # Human readbale ver of rpr
    def __str__(self):
        return f'<User: {self.email} | {self.first_name} {self.last_name}>'

    #salts and hashes our password to make it hard to steal
    def hash_password(self, original_password):
        return generate_password_hash(original_password)

    # compares the user password to the password provided in the login form
    def check_hashed_password(self, login_password):
        return check_password_hash(self.password, login_password)

    def from_dict(self, data):
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email=data['email']
        self.password = self.hash_password(data['password'])
        self.icon = data['icon']

    # save the user to the database
    def save(self):
        db.session.add(self) #adds the user to the db session
        db.session.commit() #save everythig in the session to the db

    def get_icon_url(self):
        return f'https://avatars.dicebear.com/api/avataaars/{self.icon}.svg'
    
    #WE want to be able to check if the user if following someone
    def is_following(self, user_to_check):
        return self.followed.filter(followers.c.followed_id == user_to_check.id).count()>0
    
    #follow a user
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)
            db.session.commit()

    # unfollow a user
    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            db.session.commit()
 
    # Get all the posts I am following and my own posts
    def followed_posts(self):
        # get all posts for the users I am follow
        followed = Post.query.join(followers, (Post.user_id == followers.c.followed_id)).filter(followers.c.follower_id == self.id)
        # get all my own posts
        self_posts = Post.query.filter_by(user_id = self.id)
        # smoooooshh and sort
        all_posts = followed.union(self_posts).order_by(Post.date_created.desc())
        return all_posts

@login.user_loader
def load_user(id):
    return User.query.get(int(id))
    # SELECT * FROM user WHERE id = ???


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    date_created=db.Column(db.DateTime, default=dt.utcnow)
    date_updated=db.Column(db.DateTime, onupdate=dt.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Post: {self.id} | {self.body[:15]}>'

    def edit(self, new_body):
        self.body=new_body

    def save(self):
        db.session.add(self) #adds the post to the db session
        db.session.commit() #save everything in the session to the db
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id':self.id,
            'body':self.body,
            'date_created':self.date_created,
            'date_updated':self.date_updated,
            'user_id':self.user_id,
            'author':self.author.first_name +' '+ self.author.last_name
        }

