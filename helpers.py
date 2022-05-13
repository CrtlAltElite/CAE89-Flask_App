from flask import g, abort
from functools import wraps

def require_admin(f, *args, **kwargs):
    @wraps(f)
    def check_admin(*args, **kwargs):
        if not g.current_user.is_admin:
            abort(403)
        else:
            return f(*args, **kwargs)
    return check_admin