const express = require('express');
const router = express.Router()
const wikiRouter = require('./wiki')
const userRouter = require('./user')
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.use('/wiki', wikiRouter)
router.use('/users', userRouter)

router.get('/', (req,res,next) => {

    Page.findAll()
      .then(function(foundPage){
        //console.log(foundPage);
        const data = [];
        foundPage.forEach(function(element){
            data.push(element.dataValues);
        });
        //console.log(data);
        res.render('index', {pages: data});
      })
      .catch(next);    
})

module.exports = router;