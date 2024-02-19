const express = require('express');
const routerGenres = require('./genres.routers');
const routerActors = require('./actors.routers');
const routerDirectors = require('./directors.routers');
const routerMovies = require('./movies.routers');
const router = express.Router();


// colocar las rutas aquí

router.use ('/genres',routerGenres),
router.use ('/directors', routerDirectors),
router.use ('/actors', routerActors),
router.use ('/movies', routerMovies)


module.exports = router;