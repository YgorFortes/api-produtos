function formatarData(data){
  if(data){
    const dataFormatoBrasil = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    return dataFormatoBrasil
  }
  return data = ""

} 

module.exports = formatarData;