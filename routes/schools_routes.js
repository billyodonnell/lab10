var express = require('express');
var router = express.Router();
var schoolsDal   = require('../dal/schools');

router.get('/all', function(req, res) {
    schoolsDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('schools/displayAllSchools.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    schoolsDal.GetByID(req.query.school_id, function (err, result) {
            if (err) throw err;

            res.render('schools/displaySchoolInfo.ejs', {rs: result, school_id: req.query.school_id});
        }
    );
});

router.get('/create', function(req, res, next) {
    res.render('schools/schoolFormCreate');
});

router.get('/save', function(req, res, next) {
    console.log("name equals: " + req.query.name);
    console.log("address equals: " + req.query.address);
    schoolsDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

module.exports = router;
