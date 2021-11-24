let express = require("express");
let cors = require("cors");
let Contenedor = require("./contenedor");
let contenedor = new Contenedor("file/productos.txt");
let app = express();
let {Router} = express;
const PORT = 8080;
let path = require("path");

//Declaramos la ruta
let router = new Router;

//Middleware
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/productos",router);

//Rutas
router.get("/",async(req,res,next)=>{
    res.send(await contenedor.getAll());
});

router.get("/:id",async(req,res,next)=>{
    let id = parseInt(req.params.id);
    res.send(await contenedor.getById(id));
});

router.post("/",async(req,res,next)=>{
    //const body = req.body;
    //res.send(body);
    const producto = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };
    res.json(await contenedor.save(producto));
});

router.put("/:id",async(req,res,next)=>{
    let id = parseInt(req.params.id);
    res.send(await contenedor.updateById(id));
});

router.delete("/:id",async(req,res,next)=>{
    let id = parseInt(req.params.id);
    res.send(await contenedor.deleteById(id));
});

//Raiz
app.get("/", (req, res, next) =>{
    res.sendFile(path.join(__dirname,"public","html","index.html"));
});
/*
app.get("/",(req,res,next)=>{
    res.send(`
        <h2>Implementación de un servidor con Express</h2>
        <p>puede usar las siguientes rutas:</p>
        <ul>
            <li>/productos</li>
            <li>/productoRandom</li>
        </ul>`);
});
*/

//Servidor
app.listen(PORT,()=>{
    console.log(`Mi servidor escuchando desde htpp://localhost:${PORT}`);
});