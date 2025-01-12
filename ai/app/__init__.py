from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    from app.api.routes import video_bp

    app.register_blueprint(video_bp)

    return app
