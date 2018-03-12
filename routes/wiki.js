const express = require('express');
const router = express.Router()
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.post('/', function (req, res, next) {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`

    // const page = Page.build({
    //     title: req.body.title,
    //     content: req.body.content
    // });

    // page.save()
    //     .then((savedPage) => {
    //         // res.json(page);
    //         console.log('savedpage is: ', savedPage.dataValues);
    //         res.redirect();
    //     }).catch(next);

    User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })
        .then(function (values) {
            

            const user = values[0];

            const page = Page.build({
                title: req.body.title,
                content: req.body.content
            });

            return page.save().then(function (page) {
                return page.setAuthor(user);
            });

        })
        .then(function (savedPage) {
            res.redirect(savedPage.dataValues.urlTitle);
        })
        .catch(next);

});

router.get('/', function (req, res, next) {
    // res.send('response to GET request to /wiki/');
    res.redirect('/')
});

router.get('/add', function (req, res, next) {
    // res.send('response to GET request to /wiki/add');
    res.render('addpage')
});

router.get('/:urlTitle', function (req, res, next) {
    //console.log('first log', req.params.urlTitle)
    Page.findOne({
            where: {
                urlTitle: req.params.urlTitle
            }
        })
        .then(function (foundPage) {
            //console.log('this is console.log', foundPage.dataValues)

            res.render('wikipage', foundPage.dataValues);
        })
        .catch(next);
    //res.send('hit dynamic route at ' + req.params.urlTitle);
});

module.exports = router;