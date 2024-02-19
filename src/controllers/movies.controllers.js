const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include:[Genre,Actor,Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, {include:[Genre, Actor, Director ]} );
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenre = catchError(async(req, res)=> {
    
    const { id } = req.params;
    const movies = await Movie.findByPk(id);

    // en caso de no encontrarse se responde un 404
    if(!movies) return res.sendStatus(404)

    //seteo generos 
    await  movies.setGenres(req.body)
    // leer los generos
    const genres = await movies.getGenres()

    return res.json(genres)
});

const setActor =catchError(async(req, res)=>{
    const {id}= req.params
    const movies = await Movie.findByPk(id)
    //si no hay mandamos una 404
    if(!movies) return res.sendStatus(404)

    //seteamos 
    await movies.setActors(req.body)

    const actor = movies.getActors()

    return res.json(actor)

});

const setDirector =catchError (async(req, res)=>{
    const {id} = req.params
    const movies = await Movie.findByPk(id)

    if(!movies) return res.sendStatus(404)

    //seteamos 

    await movies.setDirectors(req.body)

    //leemos 

    const director = movies.getDirectors()
    //enviamos 
    return res.json(director)
})



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenre,
    setActor,
    setDirector
}