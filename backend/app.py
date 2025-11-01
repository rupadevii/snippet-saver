from flask import Flask
from extensions import db, bcrypt, jwt
from config import Config
from routes.auth_routes import auth_routes
from routes.snippet_routes import snippet_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    CORS(auth_routes, supports_credentials=True, origins=["http://localhost:5173"])
    CORS(snippet_routes, supports_credentials=True, origins=["http://localhost:5173"])

    app.register_blueprint(auth_routes, url_prefix="/auth")
    app.register_blueprint(snippet_routes, url_prefix="/snippets")

    with app.app_context():
        db.create_all()
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)