function formatarCnpj(cnpj){
  if(cnpj){
    const cnpjSemCaracter = cnpj.replace(/\D/g, '');
    const cnpjFormatado = cnpjSemCaracter.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    return cnpjFormatado
  }
  return cnpj = "";
}

module.exports = formatarCnpj;