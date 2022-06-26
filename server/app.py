from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.secret_key = "super secret key"

currentDirectory = os.getcwd()
databasePath = os.path.join(currentDirectory, "database.db")

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + databasePath
db = SQLAlchemy(app)
import routes, models