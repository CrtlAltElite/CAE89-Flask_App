
from flask import render_template, request, flash, redirect, url_for
import requests
from .forms import LoginForm, RegisterForm
from app import app
from .models import User
from flask_login import current_user, logout_user, login_user, login_required

# ROUTES
@app.route('/', methods = ['GET'])
@login_required
def index():
    return render_template('index.html.j2')

@app.route('/students', methods = ['GET'])
@login_required
def students():
    my_students = ['Scarlett', 'Aydee', 'Patrick', 'Armani', 'Jalen']
                                                # var_name in Jinja = var name in python
    return render_template('students.html.j2', students = my_students)


@app.route('/ergast', methods=['GET','POST'])
@login_required
def ergast():
    if request.method == 'POST':
        year = request.form.get('year')
        round = request.form.get('round')
        url =  f'https://ergast.com/api/f1/{year}/{round}/driverStandings.json'
        response = requests.get(url)
        if not response.ok:
            error_string = 'We had an error'
            return render_template('ergast.html.j2', error=error_string)

        if not response.json()["MRData"]["StandingsTable"]["StandingsLists"]:
            error_string = "We had an error loading your data most likely because the year/round combo is not in the database"
            return render_template('ergast.html.j2', error=error_string)

        data = response.json()['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
        new_data = []
        for racer in data:
            racer_dict={}
            racer_dict={
                "last_name":racer['Driver']['familyName'],
                "first_name":racer['Driver']['givenName'],
                "position":racer['position'],
                "wins":racer['wins'],
                "DOB":racer['Driver']['dateOfBirth'],
                "nationality":racer['Driver']['nationality'],
                "constructor":racer['Constructors'][0]['name']
            }
            new_data.append(racer_dict)
        
        return render_template('ergast.html.j2', racers=new_data)
    return render_template('ergast.html.j2')

@app.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    if request.method=='POST' and form.validate_on_submit():
        # Do Login stuff
        email = form.email.data.lower()
        password = form.password.data

        #Look up user by email address that is trying to log in
        u=User.query.filter_by(email=email).first()
        if u and u.check_hashed_password(password):
            login_user(u)
            flash('Welcome to Fakebook!','success')
            return redirect(url_for('index'))
        flash('Incorrect Email Password Combo', 'danger')
        return render_template('login.html.j2', form=form)
    return render_template("login.html.j2", form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if request.method =='POST' and form.validate_on_submit():
        try:
            new_user_data={
                "first_name":form.first_name.data.title(),
                "last_name": form.last_name.data.title(),
                "email":form.email.data.lower(),
                "password":form.password.data
            }
            # Create an empty User
            new_user_object = User()
            #build user with the form data
            new_user_object.from_dict(new_user_data)
            #save user to the database
            new_user_object.save()

        except:
            flash("There was an unexpected Error creating you account Please Try again Later","danger")
            return render_template('register.html.j2', form=form)
        flash('You have successfully registered!', 'success')
        return redirect(url_for('login'))
    return render_template('register.html.j2', form=form)


@app.route('/logout')
@login_required
def logout():
    if current_user:
        logout_user()
        flash('You have logged out','warning')
        return redirect(url_for('login'))

