var express = require('express')
var bodyParser = require('body-parser')
var db = require('./db.js')
var app = express()

// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());

// 通用返回函数
function result(state){
    return {
        state: state
    }
}

// 登录接口
app.post('/login', function (req, res) {
    var data = [req.body.name, req.body.password]
    var sql = 'select * from user where name = ? and password = ?'
    db.base(sql, data, (results) => {
        if(results.length) {
            res.json(result(true))
        }else{
            res.json(result(false))
        }
    })
    // if(name === '123' && password === '123'){
    //     res.json(result(true))
    // }else{
    //     res.json(result(false))
    // }
})

app.listen('3000', function () {
    console.log('running...')
})