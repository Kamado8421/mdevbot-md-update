const path = require('path');
const fs = require('fs');
const { getJidDono, GetSimpleResultAPI } = require('.');
const { SERVER_HOST } = require('../../data/config');

function verificarUsuarioPremium(jid){
    const CONFIG = path.resolve(__dirname, '..', '..', 'data', 'registers', 'premiums.json');
    const PREMIUMS_LIST = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));

    return PREMIUMS_LIST.includes(jid);
}

function verificarIsDono(userJid) {
    const donoJid = getJidDono();
    let isDono = donoJid === userJid;

    return isDono;
}

async function verificarServidorAtivo() {
    try {
        let resultadoApi = await GetSimpleResultAPI(SERVER_HOST);

        if (resultadoApi.ativo) return true;
        else return false;

    } catch (error) {
        return false
    }
}

function verificarLinkYoutube(link=''){
    const YOUTUBE_URLs = [
        'https://youtube.com', 'https://www.youtube.com', 'https://youtu.be'
    ]

    for(let linkYt of YOUTUBE_URLs){
        if(link.startsWith(linkYt)) return true;
    }

    return false;
}

module.exports = {
    verificarUsuarioPremium,
    verificarIsDono,
    verificarServidorAtivo,
    verificarLinkYoutube,
}