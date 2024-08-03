from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

@app.route('/')
def home():
    return "Hello, Firebase!"

@app.route('/path1')
def path1():
    return "This is path1!"

@app.route('/path2')
def path2():
    return "This is path2!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
