module.exports = function PingMsg(pushName='', prefix='', nomeBot=''){
    let text = `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ Pong  🤖🏓

- ❧ Usuário: ${pushName}
- ❧ ${nomeBot} On ⚡

> Acesse o Menu: ${prefix}menu
> Realize seu login: ${prefix}login

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴    
    `;

    return text;
    
};