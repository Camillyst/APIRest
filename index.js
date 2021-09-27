const express = require('express');
const app = express();
const connection = require("./database/database");
const Aniversariantesbd = require("./database/aniversariantesbd");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/css', express.static('css'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("/"));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


connection.authenticate().then(() => {
    console.log("database connect!");
}).catch((erro) => {
    console.log(erro);
});


//Rotas
    app.get('../public/css/style.css', (req, res) => {
        res.render('../public/css/style')
    });

    app.get("/", (req, res) => {
        Aniversariantesbd.findAll().then((aniversariantes) => {
            res.render("index", {aniversariantes: aniversariantes})
        })
}); 

    app.get("/new", (req, res) => {
        res.render("new")
    });

    app.post("/save", (req, res) => {
        var nome = req.body.nome
        var dia = req.body.dia
        var mes = req.body.mes

        Aniversariantesbd.create({
            nome: nome,
            dia: dia,
            mes: mes
        }).then(() => {
            res.redirect("/")
        })
    });

    app.get("/edit/:id", (req, res) => {
        var id = req.params.id;
        
        Aniversariantesbd.findOne({
            where: { id : id } 
        }).then((aniversariantes) => {
            res.render("edit", { aniversariantes: aniversariantes})
        })
    });

   app.post("/update", (req, res) => {
        var id = req.body.id
        var nome = req.body.nome
        var dia = req.body.dia
        var mes = req.body.mes
    
        Aniversariantesbd.update({
            nome: nome,
            dia: dia,
            mes: mes
        }, {
            where: { id : id }
        }).then(() => {
            res.redirect("/");
        })
    });
    
    app.get("/delete/:id", (req, res) => {
        var id = req.params.id
        
        Aniversariantesbd.destroy({
            where: { id: id}
        }).then(() => {
             res.redirect("/");
        })
    });
    
    app.get("/search", (req, res) => {
        var mes = req.query.mes;
            
        Aniversariantesbd.findOne({
            where: { mes : mes }
        }).then(( aniversariantes ) => {
            res.render("search", { aniversariantes: aniversariantes });
        })
    });


    app.get("/searchdday", (req, res) => {
        var diaMes = req.params.diaMes

        diaMes.toString()

        var search = diaMes.split("+")

        var dia = diaMes[0]
        var mes = diaMes[1]

        Aniversariantesbd.findAll({
            where: { dia: dia, mes: mes }
        }).then(( aniversariantes ) => {
            res.render("search", { aniversariantes: aniversariantes });
        })
    });

    app.get("/searchletra", (req, res) => {
        var nome = req.params.nome

        var letrainicial = nome.split("", 1);

        Aniversariantesbd.findAll({
            where: { nome: letrainicial }
        }).then(( aniversariantes ) => {
            res.render("search", { aniversariantes: aniversariantes });
        })
    });

app.listen(3000, () => {
console.log("server on http://localhost:3000");
});