const express = require('express');
const router = express.Router()
const models = require('../models');
const Page = models.Page;
const User = models.User;



router.get('/', (req, res, next) => {
    // res.render('users');
    User.findAll()
        .then(function (foundUser) {
            console.log('this is founduser ', foundUser);
            const data = [];
            foundUser.forEach(function (element) {
                data.push(element.dataValues);
            });
            //console.log(data);
            res.render('users', {
                users: data
            });
        })
        .catch(next);
})

router.get('/:id', function (req, res, next) {
    const userID = req.params.id

    console.log('HHHEEELLLOOOO',userID)
    Page.findAll({
            where: {
                authorId : userID
            }
        })
        .then(function (foundPage) {
            //console.log(foundPage);
            const data = [];
            foundPage.forEach(function (element) {
                data.push(element.dataValues);
            });
            //console.log(data);
            res.render('index', {
                pages: data
            });
        })
        .catch(next);

})



module.exports = router