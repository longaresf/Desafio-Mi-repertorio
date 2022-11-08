const { Pool } = require("pg");

const pool = new Pool({
user: "postgres",
host: "localhost",
password: "megaman",
port: 5432,
database: "repertorio",
});

const insertar = async (datos) => {
    const consulta = {
    text: `INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3) RETURNING *`,
    values: datos,
    rowMode: "array",
    };
    try {
    const result = await pool.query(consulta);
    console.info(result.row[0]);
    return result;
    } catch (error) {
    console.error(error);
    return error;
    }
    };

const consultar = async () => {
    try {
    const result = await pool.query(`SELECT * FROM repertorio`);
    console.info("filas: ", result.rowCount)
    return result.rows;
    } catch (error) {
    console.error(error);
    return error;
    }
    };

const editar = async (datos) => {
    const consulta = {
    text: `UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE cancion = $1 RETURNING *`,
    values: datos,
    };

    try {
    const result = await pool.query(consulta);
    console.info(result);
    return result;
    } catch (error) {
    console.error(error);
    return error;
    }
    };

const eliminar = async (id) => {
    try {
    const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}' RETURNING *`);
    console.info('Total eliminados: ', result.rowCount)
    return result.rowCount;
    } catch (error) {
    console.error(error);
    return error;
    }
};
module.exports = { insertar, consultar, editar, eliminar };