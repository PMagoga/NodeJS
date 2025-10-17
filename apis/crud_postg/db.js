async function connect() {
  // padrão singleton para reutilizar a conexão
  if (global.connection) {
    return global.connection;
  }

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONECTION_STRING,
  });

  const client = await pool.connect();
  console.log("Database connected successfully");

  const res = await client.query("SELECT NOW()");
  console.log(res.rows[0]);

  global.connection = pool; // Store the pool in a global variable for reuse
  return client;
}

connect();
