function formataTelefone (telefone){
  if(telefone){
    const telefoneSemCaracter = telefone.replace(/\D/g, '');

    if(telefoneSemCaracter.length<11){
      const telefoneFormatado = telefoneSemCaracter.replace(/^(\d{5}|\d{4})(\d{4})$/, "$1-$2");
      return telefoneFormatado
    }

    const telefoneFormatado = telefoneSemCaracter.replace(/^(\d{2})(\d{5}|\d{4})(\d{4})$/, "($1) $2-$3");
    return telefoneFormatado;
  }
  return telefone = "";
}

module.exports = formataTelefone;