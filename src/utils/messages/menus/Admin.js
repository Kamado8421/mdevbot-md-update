module.exports = (prefix='', pushName='', nomeBot='', nomeDono='') => {
    let p = prefix;
    let text = `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

                  Menu de Administradores

> Usuário: ${pushName}
> Algoritmo: ${nomeBot}
> Dono: ${nomeDono}

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

                   Acesse outros Menus

${menus(prefix)}
> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

                   Comandos de Admin

- ❧ ${p}ban  
- ❧ ${p}mudarnomegrp + nome        
- ❧ ${p}mudardescgpr + desc       
- ❧ ${p}promoveradmin 
- ❧ ${p}rebaixaradmin  
- ❧ ${p}fechargrupo 
- ❧ ${p}abrirgrupo 
- ❧ ${p}antilink + on (ou) off
- ❧ ${p}boasvindas + on (ou) off

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴    
    `;

    return text;
}