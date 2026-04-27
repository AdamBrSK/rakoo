import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import psycopg2

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'rakoo_default_secret')
AI_MODEL_URL = os.environ.get('AI_MODEL_URL', 'http://localhost:8000')
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def get_db_connection():
    """Get database connection from environment variable"""
    database_url = os.environ.get('DATABASE_URL')
    if database_url:

        import re
        match = re.match(r'postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)', database_url)
        if match:
            return psycopg2.connect(
                user=match.group(1),
                password=match.group(2),
                host=match.group(3),
                port=match.group(4),
                database=match.group(5)
            )


    return psycopg2.connect(
        host=os.environ.get('DB_HOST', 'db'),
        database=os.environ.get('DB_NAME', 'rakoo_db'),
        user=os.environ.get('DB_USER', 'rakoo_user'),
        password=os.environ.get('DB_PASSWORD', 'rakoo_password'),
        port=os.environ.get('DB_PORT', '5432')
    )


@app.route('/')
def home():
    return 'Backend is running'


@app.route('/api/analyze', methods=['POST'])
def analyze_image():
    """Posiela obrázok do samostatného AI kontajnera na analýzu"""
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        files = {'file': (file.filename, file.read(), file.content_type)}
        
        response = requests.post(AI_MODEL_URL, files=files, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            result['filename'] = file.filename
            return jsonify(result)
        else:
            return jsonify({"error": "AI service error", "details": response.text}), 502

    except Exception as e:
        return jsonify({"error": "Could not connect to AI service", "message": str(e)}), 503


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    pw_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (%s, %s, %s, %s)",
            (data['first_name'], data['last_name'], data['email'], pw_hash)
        )
        conn.commit()
        cur.close()
        return jsonify({"msg": "Užívateľ vytvorený"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        if conn:
            conn.close()


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, password_hash FROM users WHERE email = %s", (data['email'],))
        user = cur.fetchone()
        cur.close()

        if user and bcrypt.check_password_hash(user[1], data['password']):
            access_token = create_access_token(identity=str(user[0]))
            return jsonify(access_token=access_token), 200

        return jsonify({"msg": "Nesprávny email alebo heslo"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=(os.environ.get('FLASK_ENV') == 'development'))