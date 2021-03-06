const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

class LogActivityTDG {
    //constructor is used to create a connection to the database
    constructor(){
        this.mysqlConnection = mysql.createPool({
            host: '192.185.72.57',
            user: 'arti17co_soen343',
            password: 'hy.$EA)MS4_.',
            database: 'arti17co_soen343',
            multipleStatements: true,
        });
        this.runQuery = function (queryBuild){
            let conn = this.mysqlConnection;
            queryBuild(conn,function(type){
                console.log("Completed query "+type+" \n");
            });
        };
    }
    /*
        + viewItems():
        + addItem(): void
        + modifyItem():
        + deleteItem();
    */
    viewActivity(callback){
        let sql = 'SELECT * FROM LogActivity' ;
        this.runQuery(function(conn,completedQuery){
            conn.query(sql, (err, rows, fields) => {
                if (!err){
                    let msg = {};
                    msg.success="true";
                    msg.message="no message";
                    msg.data=rows;
                    callback(msg);
                }
                else{
                    console.log(err);
                    let msg = {};
                    msg.success="false";
                    msg.message=err.sqlMessage;;
                    callback(msg);
                }
                completedQuery("[LogActivityTDG] viewActivity()");
            })
        })
    }
    addActivity(id,action,callback){
        let sql=	 '   INSERT INTO `LogActivity` (`userId`, `action`)  '  +
            '   VALUES  '  +
            '       ("'+id+'","'+action+'")';
        this.runQuery(function(conn,completedQuery){
            conn.query(sql, (err, rows, fields) => {
                if (!err){
                    let msg = {};
                    msg.success="true";
                    msg.message="no message";
                    msg.data=rows;
                    callback(msg);
                }
                else{
                    console.log(err);
                    let msg = {};
                    msg.success="false";
                    msg.message=err.sqlMessage;;
                    callback(msg);
                }
                completedQuery("[LogActivityTDG] addActivity()");
            })
        })
    }
}
module.exports = LogActivityTDG;

