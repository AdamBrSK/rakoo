from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import os
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = "rakoo"
jwt = JWTManager(app)

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return 'Backend is running'


@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    filename = secure_filename(file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(save_path)

    return jsonify({
        'message': 'Upload successful',
        'image_url': f'http://localhost:5001/static/uploads/{filename}'
    })

def get_db_connection():
    return psycopg2.connect(
        host="db",
        database="rakoo_db",
        user="rakoo_user",
        password="rakoo_password",
        port="5432"
    )

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
    app.run(host='0.0.0.0', port=5000, debug=True)