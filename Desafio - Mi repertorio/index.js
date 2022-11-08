const http = require("http");
const url = require("url");
const { insertar, consultar, editar, eliminar } = require("./consultas");
const fs = require("fs");

http.createServer(async (req, res) => {
if (req.url == "/" && req.method === "GET") {
res.setHeader("content-type", "text/html");
const html = fs.readFileSync("index.html", "utf8");
res.end(html);
}

if ((req.url == "/cancion" && req.method == "POST")) {
let body = "";
req.on("data", (chunk) => {
body += chunk;
});
req.on("end", async () => {
const datos = Object.values(JSON.parse(body));
const respuesta = await insertar(datos);
res.end(JSON.stringify(respuesta));
});
}

if (req.url == "/canciones" && req.method === "GET") {
    const registros = await consultar();
    res.end(JSON.stringify(registros));
    }

if (req.url == "/cancion" && req.method == "PUT") {
    let body = "";
    req.on("data", (chunk) => {
    body += chunk;
    });
    req.on("end", async () => {
    const datos = Object.values(JSON.parse(body));

    const respuesta = await editar(datos);
    res.end(JSON.stringify(respuesta));
    });
    }

if (req.url.startsWith("/cancion?") && req.method == "DELETE") {
    const { id } = url.parse(req.url, true).query;
    console.log(id);
    const respuesta = await eliminar(id);
    res.end(JSON.stringify(respuesta));
    }
})
    .listen(3000, () => console.info('Servidor disponible en http://localhost:3000'));