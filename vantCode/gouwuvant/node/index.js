const express = require('express')
const app = express()
const md5 = require('md5');
const jsonwebtoken = require('jsonwebtoken')
const salt = 'sflkjsldjfolsdjflskjfpdfksoef))(*skldfjlsdjfjdisjflskdlksjolfjsodjflksjkl)'
app.use(require('cors')())``
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'sys'
});
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extented: false }))
db.connect();
// 轮播图
app.get('/api/v1/main_ad_images', (req, res) => {
    let sql = 'SELECT * FROM shop_swipe'
    // 执行 SQL
    // err：如果出错，错误信息、
    // data：执行 SQL 之后的返回值
    db.query(sql, (err, data) => {
        if (err) {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})
// 商品分类
app.get('/api/v1/index_categories', (req, res) => {
    let sql = 'SELECT * FROM shop_classification'
    // 执行 SQL
    // err：如果出错，错误信息、
    // data：执行 SQL 之后的返回值
    db.query(sql, (err, data) => {
        if (err) {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})
// 商品
app.get('/api/v1/index_goods', (req, res) => {
    let page = req.query.page || 1
    let per_page = req.query.per_page || 10
    let set = (page - 1) * per_page
    let sql = `SELECT * FROM shop_goods limit ${set},${per_page}`
    // 执行 SQL
    // err：如果出错，错误信息、
    // data：执行 SQL 之后的返回值
    db.query(sql, (err, data) => {
        if (err) {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})
// 注册
app.post('/api/v1/register', (req, res) => {
    let mobile = req.body.mobile
    let password = req.body.password
    // 验证手机和密码
    let mobilere = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (!mobilere.test(mobile)) {
        res.json({
            'ok': 0,
            'error': '手机号输入不正确'
        })
        return
    }
    let passwordre = /^[0-9a-zA-Z_]{6,18}$/;
    if (!passwordre.test(password)) {
        res.json({
            'ok': 0,
            'error': "密码格式不正确：必须6--18位"
        })
        return
    }
    let sql = 'SELECT count(*) c FROM shop_users where mobile = ?'
    db.query(sql, mobile, (err, data) => {
        console.log(data)
        if (err) {
            res.json({
                'ok': 0,
                'error': err
            })
            return
        } else {
            if (data[0].c > 0) {
                res.json({
                    'ok': 0,
                    'error': '该手机已被注册'
                })
                return
            } else {
                sql = 'INSERT INTO shop_users SET ?'
                let data = {
                    mobile,
                    password: md5(password + salt),
                    time: new Date().getTime().toString().substring(0, 10)//10位以秒为单位的时间戳
                }
                db.query(sql,data,(err,data)=>{
                    if(err){
                        res.json({
                            'ok': 0,
                            'error': err
                        })
                        return
                    }else{
                        res.json({
                            'ok':1
                        })
                    }
                })
            }
        }
    })
})
// 登录
app.post('/api/v1/login', (req, res) => {
    // console.log(req.body)
    // 获取手机号和密码
    let mobile = req.body.mobile
    let password = req.body.password
    // 验证手机和密码
    let mobilere = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (!mobilere.test(mobile)) {
        res.json({
            'ok': 0,
            'error': '手机号输入不正确'
        })
        return
    }
    let passwordre = /^[0-9a-zA-Z_]{6,18}$/;
    if (!passwordre.test(password)) {
        res.json({
            'ok': 0,
            'error': "密码格式不正确：必须6--18位"
        })
        return
    }
    // 判断手机号是否存在
    let sql = 'SELECT id,password FROM shop_users where mobile = ?'
    db.query(sql, mobile, (err, data) => {
        // console.log(md5(password + salt))
        if (err) {
            res.json({
                'ok': 0,
                'error': err
            })
            return
        } else {
            if (data.length > 0) {
                // 3.1.1 判断密码
                if (data[0].password === md5(password + salt)) {
                    // 3.1.2 服务器在登录成功时，应该生成一个令牌
                    //       我们要把这个用户的信息放到这个令牌(JWT)
                    // 生成令牌：
                    // 参数一、数据（一般 用户ID 必放，其他的看情况）
                    // 参数二、密钥
                    // 参数三、配置这个信息的过期时间，不配置就是永不过期
                    let jwt = jsonwebtoken.sign({
                        id: data[0].id
                    }, salt, { expiresIn: 60 * 60 * 24 * 30 * 6 })   // 半年，单位：秒
                    res.json({
                        'ok': 1,
                        'data': {
                            'token': jwt
                        }
                    })
                    return
                } else {
                    res.json({
                        'ok': 0,
                        'error': '密码错误！'
                    })
                    return
                }
            } else {
                // 3.2 账号不存在
                res.json({
                    'ok': 0,
                    'error': '手机号码不存在！'
                })
                return
            }
            // if (data.length > 0) {
            //     if (data[0].password === md5(password + salt)) {
            //         var token = jsonwebtoken.sign({
            //            id: data[0].id
            //           }, salt, { expiresIn: 60 * 60 });
            //         res.json({
            //             'ok': '1',
            //             'data': {
            //                 'token': token
            //             }
            //         })
            //         return
            //     } else {
            //         res.json({
            //             'ok': '0',
            //             'error': '密码错误'
            //         })
            //         return
            //     }
            // } else {
            //     res.json({
            //         'ok': '0',
            //         'error': '您输入的手机未注册'
            //     })
            //     return
            // }
        }
    })
})
// 购物车商品
app.get('/api/v1/goods', (req, res) => {
    // 获取id
    let id = req.query.id
    // 将获取的id 转为数组
    id = id.split(',')
    // 给？设置空数组
    let wenhao = []
    // 循环遍历id 有几个id就有几个？ 
    id.forEach(element => {
        wenhao.push('?')
    });
    // 把wenhao数组变为字符串
    wenhao = wenhao.join(',')
    // sql语句为了安全不会被sql注入设置过滤
    let sql = `SELECT * FROM shop_goods where id in(${wenhao})`
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({
                'ok': '0',
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})
app.listen(8000, () => {
    console.log('http://localhost:8000')
})