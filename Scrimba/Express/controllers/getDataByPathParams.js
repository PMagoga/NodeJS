import { startups } from "../data/data.js";

export const getDataByPathParams = (req, res) => {
  //desestruturação
  const { field, term } = req.params;

  // se eu quiser especificar somente os campos
  const allowedFields = ["country", "continent", "industry"];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({
      message:
        "Pesquisa não permitida. Somentes os campos 'field', 'continent', 'industry",
    }); // o return foi usado aqui para evitar que o código dar erro, pois iria aplicar o método json duas vezes
  }

  const filteredData = startups.filter(
    (startup) => startup[field].toLowerCase() === term.toLocaleLowerCase()
  );

  res.json(filteredData);
};
