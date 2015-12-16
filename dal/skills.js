var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.GetAll = function(callback) {
    connection.query('SELECT * FROM skills;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};


exports.GetByID = function(skill_id, callback) {
    console.log(skill_id);
    var query = 'SELECT * FROM skills WHERE skill_id=' + skill_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};


exports.Insert = function(skill_info, callback) {
    console.log(skill_info);

    var dynamic_query = 'INSERT INTO skills (description, name, user_email, user_id) VALUES (' +
        '\'' + skill_info.description + '\', ' +
        '\'' + skill_info.name + '\', ' +
        '\'' + skill_info.user_email + '\', ' +
        '\'' + skill_info.user_id + '\'' +
        ');';

    console.log("test");
    console.log(dynamic_query);

    connection.query(dynamic_query,
        function (err, result) {
            if(err) {

                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.GetAccount = function(skill_id, callback){
    console.log(skill_id);

    var query = 'SELECT * FROM SkillAccountView WHERE skill_id = ' + skill_id;

    connection.query(query, function(err, result){
        callback(err, result);
    })
}
