const knex = require('../database/connection');

exports.factory = (url) => {
    return {
      url:url
    }
  }
  
  // Obtiene todos los productos en la base
  exports.all = () => {
    // Realiza la consulta dentro de knex
    return knex
      .select('*')
      .from('urls');
  }

  exports.store = (url) => {
    return knex('urls')
    .insert({longURL : url.longURL, shortURL : url.shortURL});
  }

  exports.find = (id) => {
    return knex
      .select('*')
      .from('urls')
      .where('id', id)
      .first();
  }

  exports.findShortUrl = (shortURL) => {
      return knex
      .select('*')
      .from('urls')
      .where('shortURL',shortURL)
      .first();
  }

  exports.addRedirects = (url) => {
      return knex('urls')
      .update({timesRedirected : url.timesRedirected + 1})
      .where('id', url.id);
  }

  