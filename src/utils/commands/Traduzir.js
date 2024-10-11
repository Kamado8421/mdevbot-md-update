const { PostSimpleResultAPI } = require('../functions');
const { SERVER_HOST, nomeBot } = require('../../data/config');
const { ErroGenerico } = require('../messages/templates/ErroGenerico');

async function execComandoTraduzir(texto){

    const data = {
        souce: 'en',
        target: 'pt',
        text: texto
    }

    const resultado = await PostSimpleResultAPI(SERVER_HOST, data);

    if(!resultado?.translation?.content) return ErroGenerico('Tive um erro interno ao traduzir, verifique sua frase, ela está em inglês mesmo?', nomeBot);

    return `> --------------------\n${nomeBot} Tradutor\n> --------------------\n\n*Texto:*\n- ${texto}\n\n*Tradução:*\n- ${resultado.translation.content}\n> --------------------`
}

module.exports = execComandoTraduzir;