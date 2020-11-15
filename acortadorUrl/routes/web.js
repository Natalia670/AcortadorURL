let router = require('express').Router();
let PagesController = require('../controllers/PagesController');

router.get('/', PagesController.mainPage);
router.post('/urls',PagesController.readUrl);


router.get('/:shortUrl', PagesController.showUrl);

router.get('/estadisticas/:shortUrl', PagesController.showStats);

router.put('/updateRed', PagesController.updateRedirect);


module.exports = router;