module.exports = function menus(prefix){
    const menus = ['menu', 'dono', 'admin', 'premium', 'moedas', 'games'];
    let menusConcatenado = '';

    for(menu of menus){
        if(menu !== 'menu') menusConcatenado += `- ❧ ${prefix}menu-${menu}\n`;
        else menusConcatenado += `- ❧ ${prefix}menu\n`;
    }

    return menusConcatenado;
};

