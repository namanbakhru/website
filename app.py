#from __future__ import print_function
from flask import Flask, render_template, request, json
#from flask_mysqldb import MySQL
import studentData

import httplib2
import os
import io

from apiclient import discovery
from apiclient.http import MediaFileUpload
from apiclient.http import MediaIoBaseDownload
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

#The code below gives an argument passing error that needs to be fixed due to which quickstart.py first needs to be run before app.py the first time the system is started or SCOPE is changed
"""try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None"""
#flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/drive-python-quickstart.json
SCOPES = 'https://www.googleapis.com/auth/drive'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Math Web'

def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'drive-python-quickstart.json')

    print(credential_path);

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

def returnFileList(parent1, parent2, parent3):
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('drive', 'v3', http=http)
    parentid2 = service.files().list(q="name contains 'DAA'", pageSize=500,fields="nextPageToken, files(id, name)").execute().get('files', [])[0]['id'];
    print parentid2
    print "me"
    parentid2 = "'" + parentid2 + "'"
    results = service.files().list(q=parentid2+" in parents",pageSize = 100, fields="nextPageToken, files(id, name)").execute()
    items = results.get('files', [])
    if not items:
        print('No files found.')
    else:
        print('Files:')
        for item in items:
            print('{0} ({1})'.format(item['name'], item['id']))
        return json.dumps(items)

app = Flask(__name__)
#mysql = MySQL(app)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/templates/pages/gallery.html")
def vision():
	return render_template("pages/gallery.html")

@app.route("/templates/pages/full-width.html")
def gallery():
	return render_template("pages/full-width.html")

@app.route("/templates/pages/sidebar-left.html")
def pastEvents():
	return render_template("pages/sidebar-left.html")

@app.route("/templates/pages/sidebar-right.html")
def team():
	return render_template("pages/sidebar-right.html")

@app.route("/templates/pages/basic-grid.html")
def upcomingEvents():
	return render_template("pages/basic-grid.html")

@app.route("/searchQuery", methods=["POST"])
def searchQuery():
	return "Hello "+request.form["query"];
	#return ['query'];

@app.route("/listdrivefiles", methods=["POST"])
def listDriveFiles():
	commandarr = request.form["commandarr"]
	print commandarr;
	return returnFileList("Hello", "Tata", "Bye Bye")


@app.route("/signup")
def signUp():
	#conn = MySQL.connect(host="localhost", user="root", passwd="", db="mathletesdb")
	"""Before running this command make sure that flask_mysqldb is installed (sudo pip install flask-mysqldb)
	and its often required dependency mysqlconfig (sudo apt-get install ibmysqlclient-dev).
	Also make sure that the connection strings (i.e host, user, passwd, db) are set properly"""
	"""cur = mysql.connection.cursor()
    cur.execute('''SELECT user, host FROM mysql.user''')
    rv = cur.fetchall()
    return str(rv)"""
	return render_template("pages/signup.html")

@app.route("/signupfeed", methods=["POST"])
def signUpFeed():
	datafilename = "studententry1.json";
	datafile = open(datafilename, "w+");
	datafile.write(json.dumps(request.form));
	imagefile = request.files['userimage'];
	imagefile.save('var/www/uploads/' + request.form['rollno']+imagefile.filename);
	datafile.close();
	return "Success";

@app.route("/announcements")
def announcement():
	return render_template("pages/announcements.html");

if __name__ == "__main__":
    app.run(debug=True);