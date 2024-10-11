/*const { rotaYt_dlp, CACHE_FOLDER } = require("../../data/config");
const { SendMessage } = require("../messages");
const { exec } = require('child_process');
const path = require('path');

async function downloadVideo(urlYt, ytDlpPath) {
    try {
        const downloadPath = CACHE_FOLDER; //path.resolve(__dirname, 'downloads'); // Define o caminho para a pasta 'downloads'

        // Comando para baixar o vídeo com yt-dlp e salvar em ./downloads
        const command = `"${ytDlpPath}" -o "${downloadPath}/%(title)s.%(ext)s" ${urlYt}`;

        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro: ${error.message}`);
                    reject(error);
                    return;
                }

                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }

                console.log(`stdout: ${stdout}`);
                resolve(stdout);
            });
        });
    } catch (error) {
        console.error('Erro no download:', error);
    }
}

async function execComandoPlayVideo(MDEVBOT = new SendMessage, videoUrl) {
    if (!videoUrl) return;

    downloadVideo(videoUrl, rotaYt_dlp)
        .then(async () => {
            await MDEVBOT.enviarTexto('Download Concluído!! ✅');
            await MDEVBOT.enviarTexto('Aguarde o envio... ⌛');
            await MDEVBOT.enviarTexto('> Vídeo Baixado!!');
        })
        .catch(async err => {
            console.error(err);
            await MDEVBOT.enviarTexto('Desculpe, não consegui fazer Download do vídeo :(');
        });
}

module.exports = execComandoPlayVideo;


const { rotaYt_dlp, CACHE_FOLDER } = require("../../data/config");
const { SendMessage } = require("../messages");
const { exec } = require('child_process');
const path = require('path');

async function downloadVideo(urlYt, ytDlpPath) {
    try {
        const downloadPath = CACHE_FOLDER; // Define o caminho para a pasta de downloads
        // Adiciona o comando para garantir o formato MP4 e capturar o nome do arquivo baixado
        const command = `"${ytDlpPath}" -o "${downloadPath}/%(title)s.%(ext)s" --recode-video mp4 --print filename ${urlYt}`;

        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro: ${error.message}`);
                    reject(error);
                    return;
                }

                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }

                // O nome do arquivo baixado é retornado no stdout
                const downloadedFileName = stdout.trim();  // Captura o nome do arquivo no stdout e remove espaços extras
                console.log(`Arquivo baixado: ${downloadedFileName}`);
                resolve(downloadedFileName);
            });
        });
    } catch (error) {
        console.error('Erro no download:', error);
    }
}

async function execComandoPlayVideo(MDEVBOT = new SendMessage, videoUrl) {
    if (!videoUrl) return;

    downloadVideo(videoUrl, rotaYt_dlp)
        .then(async (downloadedFileName) => {
            await MDEVBOT.enviarTexto('Download Concluído!! ✅');
            await MDEVBOT.enviarTexto('Aguarde o envio... ⌛');
            await MDEVBOT.enviarVideo(downloadedFileName, 'video', true);
        })
        .catch(async err => {
            console.error(err);
            await MDEVBOT.enviarTexto('Desculpe, não consegui fazer Download do vídeo :(');
        });
}

module.exports = execComandoPlayVideo;
*/

const { rotaYt_dlp, CACHE_FOLDER, nomeBot } = require("../../data/config");
const { SendMessage } = require("../messages");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function downloadVideo(urlYt, ytDlpPath, jid) {
    try {
        const downloadFileName = `user-${jid}-download.mp4`;  // Nome que você deseja para o arquivo final
        const downloadPath = path.join(CACHE_FOLDER, downloadFileName); // Caminho completo com o nome do arquivo

        // Comando para baixar o vídeo em MP4 e já salvar como 'user-download.mp4'
        const command = `"${ytDlpPath}" -f bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4 -o "${downloadPath}" ${urlYt}`;

        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro: ${error.message}`);
                    reject(error);
                    return;
                }

                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }

                console.log(`stdout: ${stdout}`);
                console.log(`Arquivo baixado: ${downloadFileName}`);  // Loga o nome do arquivo baixado

                let dataDownloadVideo = {
                    name: `user-${jid}-download.mp4`,
                    path: downloadPath
                }
                
                resolve(dataDownloadVideo);

            });
        });
    } catch (error) {
        console.error('Erro no download:', error);
    }
}

async function execComandoPlayVideo(jid, MDEVBOT = new SendMessage, videoUrl) {
    if (!videoUrl) return;

    downloadVideo(videoUrl, rotaYt_dlp, jid)
        .then(async (dataDownloadVideo) => {
            await MDEVBOT.enviarTexto('Download Concluído!! ✅');
            await MDEVBOT.enviarTexto('Aguarde o envio... ⌛');
            let legenda = `> ✅ ${nomeBot} Downloader\n- ⬇️ Aqui está seu vídeo!!`;
            await MDEVBOT.enviarVideo(dataDownloadVideo.name, legenda, true);  // Envia o vídeo com o nome do arquivo baixado para o JID do chat
            
            fs.unlinkSync(dataDownloadVideo.path);

        })
        .catch(async err => {
            console.error(err);
            await MDEVBOT.enviarTexto('Desculpa, não consegui fazer enviar o vídeo :(');
        });
}

module.exports = execComandoPlayVideo;
