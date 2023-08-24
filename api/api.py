import time
from flask import Flask

app = Flask(__name__)

# Will return a JSON payload like: {"time": 1589144576.033372}
@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/whoisthegreatest')
def get_greatest():
    return {'name': 'Ann Cascarano'}