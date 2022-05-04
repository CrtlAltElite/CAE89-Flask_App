
from flask import Flask, render_template, request
import requests
import os

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email

class Config():
    SECRET_KEY = os.environ.get("SECRET_KEY")
    REGISTERED_USERS={
        'kevinb@codingtemple.com':{"name":"Kevin","password":"abc123"},
        'shohat@codingtemple.com':{"name":"Shoha","password":"Colt45"},
        'joelc@codingtemple.com':{"name":"Joel", "password":"MorphinTime"}
    }

class LoginForm(FlaskForm):
    email = StringField('Email Address', validators=[DataRequired(),Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')


app = Flask(__name__)
app.config.from_object(Config)

@app.route('/', methods = ['GET'])
def index():
    return render_template('index.html.j2')

@app.route('/students', methods = ['GET'])
def students():
    my_students = ['Scarlett', 'Aydee', 'Patrick', 'Armani', 'Jalen']
                                                # var_name in Jinja = var name in python
    return render_template('students.html.j2', students = my_students)

@app.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    if request.method=='POST' and form.validate_on_submit():
        # Do Login stuff
        email = form.email.data.lower()
        password = form.password.data
        if email in app.config.get("REGISTERED_USERS") and password == app.config.get("REGISTERED_USERS").get(email).get('password'):
            #Login success!!!
            return f"Login Succes Welcome {app.config.get('REGISTERED_USERS').get(email).get('name')}"
        error_string = "Incorrect Email/Password Combo"
        return render_template("login.html.j2", error=error_string, form=form)

    return render_template("login.html.j2", form=form)

@app.route('/ergast', methods=['GET','POST'])
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