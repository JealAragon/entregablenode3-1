const Movie = require('./Movie');
const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');



// crear la tabla pivot de movieGenre

Movie.belongsToMany(Genre, {through: 'movieGenre'})
Genre.belongsToMany(Movie, {through: 'movieGenre'})

// crear la tabla pivot  movieActor

Movie.belongsToMany(Actor, {through: 'movieActor'})
Actor.belongsToMany(Movie, {through: 'movieActor'})

// crear un tabla pivot  de movieDirector

Movie.belongsToMany(Director,{through: 'moviesDirector'})
Director.belongsToMany(Movie,{through: 'moviesDirector'})

