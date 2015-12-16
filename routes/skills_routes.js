var express = require('express');
var router = express.Router();
var accountDal   = require('../dal/accounts');
var skillsDal = require('../dal/skills');

router.get('/all', function(req, res) {
    skillsDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('skills/displayAllSkills.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    skillsDal.GetByID(req.query.skill_id, function (err, result) {
            if (err) throw err;

            res.render('skills/displaySkillInfo.ejs', {rs: result, skill_id: req.query.skill_id});
        }
    );
});

router.get('/save', function(req, res, next) {
    console.log("description equals: " + req.query.description);
    console.log("the name submitted was: " + req.query.name);
    console.log("the email submitted was: " + req.query.user_email);
    console.log("the user_id submitted was: " + req.query.user_id);
    skillsDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});


router.get('/create', function(req, res, next) {
    res.render('skills/skillFormCreate');
});

module.exports = router;
