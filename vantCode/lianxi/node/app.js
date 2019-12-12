const express = require('express');
const app = express()
var mysql = require('mysql');
app.use(require('cors')())
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'sys',
    multipleStatements: true
});
app.get('/api/v1/shop',(req,res)=>{
    // console.log(req.query.id)
    let data=[]
    data.push(req.query.id)
    let sql = `select * from shop_goods where id in (${data})`
    con.query(sql,(err,result)=>{
        // console.log(result)
        if(err){
            res.json({
                'ok':0,
                'error':err
            })
        }else{
            res.json({
                'ok':1,
                'data':result
            })
        }
    })
})
con.connect();
app.listen(9000, () => {
    console.log('http://localhost:9000')
})