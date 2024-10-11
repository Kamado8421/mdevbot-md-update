from flask import Flask, request, jsonify
import yt_dlp
import os
from deep_translator import GoogleTranslator 
import instaloader

app = Flask(__name__)

# Diretório para salvar os downloads
output_dir = 'downloads'


# Função para baixar vídeo e áudio
def download_video_audio(url):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    ydl_opts = {
        'format': 'bestvideo+bestaudio',
        'outtmpl': os.path.join(output_dir, '%(title)s.%(ext)s'),
        'merge_output_format': 'mp4',
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
        'quiet': False,  # Para ver os logs do download
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        title = info_dict.get('title', None)  # Obtém o título do vídeo

    return title  # Retorna o título do vídeo

@app.route('/')
def index():
    return jsonify({"message": 'api no ar', 'ativo': True}), 200

@app.route('/yt-download/video', methods=['POST'])
def download():
    data = request.get_json()
    video_url = data.get('url')

    if not video_url:
        return jsonify({'error': 'URL não fornecida'}), 400

    try:
        video_title = download_video_audio(video_url)  # Chama a função e obtém o título
        return jsonify({'message': 'Download concluído!', 'title': video_title}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/yt-delete/video', methods=['POST'])
def delete_video():
    data = request.get_json()
    video_title = data.get('title')

    if not video_title:
        return jsonify({'error': 'Título não fornecido'}), 400

    # Cria o caminho completo do arquivo
    video_file_path = os.path.join(output_dir, f"{video_title}.mp4")  # Supondo que o vídeo é salvo como MP4

    try:
        if os.path.exists(video_file_path):
            os.remove(video_file_path)  # Remove o arquivo
            return jsonify({'message': f'Vídeo "{video_title}" deletado com sucesso!'}), 200
        else:
            return jsonify({'error': 'Vídeo não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    souce = data.get('souce')
    target = data.get('target')

    texto = data.get('text')

    if not souce or not target:
        return jsonify({'error': 'Parâmetros não fornecidos'}), 400
    
    tradutor = GoogleTranslator(souce=souce, target=target)

    traducao = tradutor.translate(texto)
    return jsonify({
        'text': {
            'language': souce,
            'content': texto
        },
        'translation': {
            'language': target,
            'content': traducao
        }
    }), 200


@app.route('/get-info/instagram', methods=['GET'])
def getInfoInstagram():
    # Obtém o nome de usuário da query string
    user = request.args.get('user')

    if not user:
        return jsonify({"error": "User parameter is required"}), 400

    bot = instaloader.Instaloader()

    try:
        # Obtém o perfil do usuário
        profile = instaloader.Profile.from_username(bot.context, user)
        
        data = {
            "username": profile.username,
            "fullname": profile.full_name,
            "followers": profile.followers,
            "following": profile.followees,
            "biography": profile.biography,
            "numberPosts": profile.mediacount,
            "userFound": True
        }

    except instaloader.exceptions.ProfileNotExistsException:
        data = {
            "error": "Profile not found",
            "userFound": False
        }

    # Retorna os dados em formato JSON
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
