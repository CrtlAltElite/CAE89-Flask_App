import os
# CONFIG SECTION
class Config():
    SECRET_KEY = os.environ.get("SECRET_KEY")
    REGISTERED_USERS={
        'kevinb@codingtemple.com':{"name":"Kevin","password":"abc123"},
        'shohat@codingtemple.com':{"name":"Shoha","password":"Colt45"},
        'joelc@codingtemple.com':{"name":"Joel", "password":"MorphinTime"}
    }