import os
import sys
# CHANGED!!!!!!!
#
#sys.path.insert(0, os.path.dirname(__file__))
#
#
#def application(environ, start_response):
#    start_response('200 OK', [('Content-Type', 'text/plain')])
#    message = 'It works!\n'
#    version = 'Python %s\n' % sys.version.split()[0]
#    response = '\n'.join([message, version])
#    return [response.encode()]

# add your project directory to the sys.path
project_home = '/home/nasltdca/public_html/tools/ProductionServer'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path
    
activate_this = '/home/nasltdca/virtualenv/public_html/tools/ProductionServer/3.9/bin/activate_this.py'
with open(activate_this) as f:
    exec(f.read(), dict(__file__=activate_this))

# import flask app but need to call it "application" for WSGI to work
from tool_app import app as application  # noqa