import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename

upload_bp = Blueprint('upload', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"success": False, "message": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"success": False, "message": "No selected file"}), 400
    
    # Path inside media folder, default to 'images'
    # Use 'folder' from form if provided, e.g. 'images/hero'
    folder_path = request.form.get('folder', 'images')
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        
        # Base media directory (absolute path)
        # backend/media
        media_root = os.path.join(current_app.root_path, '..', current_app.config.get('MEDIA_FOLDER', 'media'))
        
        # Target directory inside media
        target_dir = os.path.join(media_root, folder_path)
        
        # Create directory if it doesn't exist
        os.makedirs(target_dir, exist_ok=True)
        
        # Full save path
        file_path = os.path.join(target_dir, filename)
        file.save(file_path)
        
        # Construct URL for the frontend
        # The 'serve_media' route matches /backendcipress/media/<path:filename>
        # So filename should be folder_path/filename
        url = f"/backendcipress/media/{folder_path}/{filename}"
        
        return jsonify({
            "success": True, 
            "url": url,
            "message": "File uploaded successfully"
        }), 200
    
    return jsonify({"success": False, "message": "File type not allowed"}), 400
