import uuid
import os
from app.api.s3_connecter import s3_connection

from flask import jsonify, request, Blueprint, current_app, send_from_directory
from werkzeug.utils import secure_filename

from app.model.motion_detector import detect

video_bp = Blueprint('video_api', __name__)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'mp4'}


@video_bp.route('/ai/feedback', methods=['POST'])
def upload_video():
    mode = request.form.get('mode')
    if not mode:
        return jsonify({'error': 'No mode selected'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file found'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        file_name = str(uuid.uuid4()) + "_" + secure_filename(file.filename)
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_name)
        file.save(upload_path)
        detect(file_name, int(mode))
        os.remove(upload_path)
        return send_from_directory(current_app.config['OUTPUT_FOLDER'], file_name, as_attachment=True)
    return jsonify({'error': 'Invalid file type'}), 400


@video_bp.route('/ai/video', methods=['POST'])
def upload_video_to_s3():
    mode = request.form.get('mode')
    if not mode:
        return jsonify({'error': 'No mode selected'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file found'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        file_name = str(uuid.uuid4()) + "_" + secure_filename(file.filename)
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_name)
        file.save(upload_path)
        detect(file_name, int(mode))
        os.remove(upload_path)

        output_path = os.path.join(current_app.config['OUTPUT_FOLDER'], file_name)
        bucket_name = str(current_app.config['S3_BUCKET_NAME'])

        s3_path = "feedback/" + file_name

        s3 = s3_connection()
        with open(output_path, 'rb') as file_data:
            s3.put_object(
                Bucket=bucket_name,
                Key=s3_path,
                Body=file_data
            )

        image_url = f'https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{s3_path}'

        return image_url
    return jsonify({'error': 'Invalid file type'}), 400
