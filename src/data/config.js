const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.resolve(__dirname, 'admin', 'info.json');

const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

// configuraçoes de dono
exports.prefix = CONFIG.prefixo;
exports.nomeDono = CONFIG.nomeDono;
exports.nomeBot = CONFIG.nomeBot;
exports.numeroDono = CONFIG.numeroDono;
exports.rotaYt_dlp = CONFIG.rotaYt_dlp;

// config de APIs
const API_DATA_PATH = path.resolve(__dirname, 'apis', 'keys.json');
const APIKEYS_DATA = JSON.parse(fs.readFileSync(API_DATA_PATH, 'utf8'));
exports.API_KEYs = APIKEYS_DATA.apikeys;

// armazenamento de cache
exports.CACHE_FOLDER = path.resolve(__dirname, '..', '..', 'assets', 'cache');

exports.SERVER_HOST = 'http://127.0.0.1:5000/';

