// 封装连接数据库方法
var mysql = require('mysql')

exports.base = (sql, data, callback) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'mywebsite'
    })
    connection.connect()
    connection.query(sql, data, function (error, results, fields) {
        if(error) throw error
        callback(results)
    })
    connection.end()
}