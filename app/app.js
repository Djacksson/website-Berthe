const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config()

//############################################################
//############################################################
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

//############################################################
//############################################################
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000", "http://localhost:8100", "http://localhost:4200"],
        default: "http://localhost:3000",
        credentials: true,
        optionSuccessStatus: 200,
    }));

//############################################################
//############################################################
//Importation des routes
const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');

//############################################################
//############################################################
// Appel des Routes
app.use('/user', userRoute);
app.use('/auth', authRoute);

app.use('/', (req, res) => { return res.status(200).render("index") });
app.use((req, res) => { res.status(404).render("404") });


module.exports = app;
