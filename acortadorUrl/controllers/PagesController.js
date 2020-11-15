let UrlModel = require('../models/urls')
let nanoid = require('nanoid')

// Reglas para la respuesta para la petición "/"
exports.showUrl= (req, res) => {
  console.log("ESTO ES PARAMS ",req.params);
  let parameter = req.params.shortUrl;
  let strparam = parameter.toString();
  console.log(parameter);
  let lastSymbol = strparam.charAt(strparam.length - 1);
  if(lastSymbol == "+"){
    const nanoid = parameter.replace("+", "");
    res.redirect(`/estadisticas/${nanoid}`);
  }else{
    UrlModel.findShortUrl(parameter).then((url) => {
      console.log(url.longURL);
      UrlModel.addRedirects(url).then((timesRedirected) => {
        console.log(timesRedirected);
      })
      res.redirect(url.longURL);
    });
   
  } 
}
  
  exports.mainPage = (req,res) => {
    UrlModel.all()
    .then((data) => {
      let url = data;
      res.render('pages/homepage', { shortURL: url.shortURL });
    });
  }

  exports.readUrl = (req, res) => {
    let url = {};
    url.longURL = req.body.url;
    console.log(req.body.url);
    const shortUrl= nanoid.nanoid(6);
    url.shortURL = shortUrl;
    UrlModel.store(url).then((id)=>{
      console.log('Url created with id: ', id);
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        UrlModel.find(id).then((url) => res.json(url));
      } else {
        res.redirect('/');
      }
    })
  }

  exports.updateRedirect = (req,res) => {
    console.log("Entre a el updateRedirect");
    let id= req.body.id;
    console.log(id);
    UrlModel.find(id).then((data) =>{
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        UrlModel.addRedirects(data).then((url) => res.json(url)) ;
      } else {
        res.redirect('/');
      }
    })

  }

  exports.showStats = (req,res) => {
    let shortUrl= req.params.shortUrl;
    console.log("EN SHOWSTATS",shortUrl);
    UrlModel.findShortUrl(shortUrl).then((data) =>{
        //console.log("DATA",data.longURL);
        res.render('pages/estadisticas', {url: data});
    })
  }

  