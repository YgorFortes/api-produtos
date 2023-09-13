function associacaoInclude(model,  propriedade, valor, through = null, as =  null){
  const include = {
   model: model,
   through: through,
   as :as,
   where: {[propriedade]:  valor}
 }

 return include;
}

module.exports = associacaoInclude;