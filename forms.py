from typing import Optional
from flask.app import Flask
from flask_wtf import *
from wtforms import *
from models import *
from wtforms.validators import *

class CupcakeForm(FlaskForm):

    flavor = StringField("Cupcake Flavor",
                        validators=[InputRequired()])

    size = SelectField("Size",
                        choices=[('small','small'),('medium', 'medium'), ('large', 'large')])

    rating = DecimalField("Rating", 
                        validators=[InputRequired()])

    image = StringField("Image URL",
                        validators=[URL(), Optional()])