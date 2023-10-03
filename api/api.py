import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


if __name__ == '__main__':
    app.run(debug=True)
