function formataCpf(cpf){
  if(cpf){
    const dado = cpf.replace(/\D/g, '');
    const cpfFormatado = dado.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1-$2-$3-$4'); 
    return cpfFormatado;
  } 
  return cpf = "";
  
}

module.exports = formataCpf;