var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM accounts;',
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


exports.GetByID = function(user_id, callback) {
    console.log(user_id);
    var query = 'SELECT * FROM accounts WHERE user_id=' + user_id;
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

exports.GetUserJobView = function(callback) {
    connection.query('select u.fname, u.lname, UserJobView.* from UserJobView join accounts u ' +
        'on UserJobView.user_id = u.user_id;',
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

exports.Insert = function(account_info, callback) {
    console.log(account_info);

    var dynamic_query = 'INSERT INTO accounts (fname, lname, email, password) VALUES (' +
        '\'' + account_info.firstname + '\', ' +
        '\'' + account_info.lastname + '\', ' +
        '\'' + account_info.email + '\', ' +
        '\'' + account_info.password + '\'' +
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

exports.GetAddress = function(user_id, callback){
    console.log(user_id);

    var query = 'SELECT * FROM AccountAddressView WHERE user_id = ' + user_id;

    connection.query(query, function(err, result){
        callback(err, result);
    })
}

exports.AddAddress = function(info, callback) {
    console.log(info);

    var query_data = [info.user_id, info.address_id];
    console.log(query_data);

    var query = 'INSERT INTO account_addresses (user_id, address_id) VALUES (?, ?)';
    console.log(query);

    connection.query(query, query_data, function(err, result){
        callback(err, result);
    });

}
