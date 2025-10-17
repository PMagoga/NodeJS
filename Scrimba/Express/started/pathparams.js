import express from "express";
import { startups } from "../data/data.js";

const PORT = 8000;

const app = express();

app.get("/api/:field/:term", (req, res) => {
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
});

app.listen(PORT, () => console.log(`server connected on port ${PORT}`));

/*
Challenge:
1. Add a new route which accepts GET requests to /api/<field>/<term>.
2. Filter the data based on the path params.
3. Serve the filtered data.

For now, don’t worry that using some fields will trigger an error.

** The functionality **
Get all startups in a given country via api/country/<country name>
Get all startups in a given continent via api/continent/<continent name>
Get all startups in a given industry via api/industry/<industry name>

**Test Cases** 

These should work:
  api/country/india
  api/continent/europe
  api/industry/ai

This will throw an error - but that's fine!
	api/has_mvp/true

*/
