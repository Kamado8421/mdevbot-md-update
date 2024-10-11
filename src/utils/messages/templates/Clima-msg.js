module.exports = function ClimaMsg(cidade, temperatura, min, max, umidade, status, nomeBot){
    let text = `
🏜️🌤️ *Previsão do Tempo*

- 🤖🌃 *Cidade:* ${cidade}

> *Resultado do Clima*

- *☁️ Atual:* ${temperatura}°C
- *🥶 Mínima:* ${min}°C
- *🥵 Máxima:* ${max}°C

> *💦 Umidade:* ${umidade}%
> 💨 *Tempo:* ${status}

> Information by _Open Weather_

> © ${nomeBot} ²⁰²⁴    
`;

    return text;
}