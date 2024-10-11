const ClimaMsg = require('../messages/templates/Clima-msg');

const { nomeBot } = require('../../data/config');
const { GetSimpleResultAPI } = require('../functions');
const APIInvalidaMsg = require('../messages/templates/APIKeyInvalida');

async function execComandoClima(args='', API_KEYs) {
    var URL = `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${API_KEYs.clima.key}&lang=pt_br`;
    const resultado = await GetSimpleResultAPI(URL);
    
    if(resultado?.code === 401 || resultado?.message.toLowerCase().startsWith('invalid api key.')) return APIInvalidaMsg(nomeBot);

    const dados = {
        cidade: resultado.name,
        temperatura: parseInt(resultado.main.temp),
        minima: parseInt(resultado.main.temp_min),
        maxima: parseInt(resultado.main.temp_max),
        umidade: parseInt(resultado.main.humidity),
        descricao: resultado.weather[0].description
    }

    var texto = ClimaMsg(dados.cidade, dados.temperatura, dados.minima, dados.maxima, dados.umidade, nomeBot);

    return texto;
}

module.exports = execComandoClima;