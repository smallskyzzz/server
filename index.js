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

// 增加内容接口
app.post('/add', function (req, res) {
    var data = [req.body.title, req.body.content, req.body.category]
    var sql = 'insert into content (title, content, category) values (?, ?, ?)'
    db.base(sql, data, (results) => {
        // 插入成功
        if(results.affectedRows) {
            res.json(result(true))
        }else {
            res.json(result(false))
        }
    })
})

// 查询内容接口
app.get('/getContent', function (req, res) {
    var sql = 'select * from content'
    db.base(sql, [], (results) => {
        res.json({
            state: true,
            results: results
        })
    })
})

app.listen('3000', function () {
    console.log('running...')
})