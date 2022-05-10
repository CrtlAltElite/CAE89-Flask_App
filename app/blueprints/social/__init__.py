from flask import Blueprint

bp = Blueprint('social',__name__,url_prefix='')

from .import routes