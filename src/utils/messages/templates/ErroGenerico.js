const { nomeBot } = require("../../../data/config");

exports.ErroGenerico = (erro) =>{
    let text = `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ *ERRO AO EXECUTAR O COMANDO*

- ❧ ⚠️ ${erro}

> Tente Novamente mais tarde

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴    
    `;

    return text;
    
};