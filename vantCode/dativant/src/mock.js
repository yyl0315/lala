import Mock from 'mockjs'
Mock.mock('http://localhost:9999/api/v1/users/access_token', 'get', {
    'ok': 1,
    'username': '汤姆',
    'password': '123123',
    'token': 'sdfpjsodfjhoshdfkj'
})
Mock.mock('http://localhost:9999/api/v1/users/face', 'get', {
    'ok': 1,
    'data': [{
        'face': './assets/logo.png'
    }]

})
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/question/, 'get', {
    'ok': 1,
    'data|10': [{
        'id|+1': 1,
        'title': '@ctitle(4,7)',
        'option': ['@ctitle', '@ctitle', '@ctitle', '@ctitle'],
        'right': '@integer(0,3)'
    }]


})
Mock.mock('http://localhost:9999/api/v1/categories', 'get', {
    "ok": 1,
    "data": [
        {
            "id": 1,
            "cat_name": "HTML",
            "right_rate": 100
        },
        {
            "id": 2,
            "cat_name": "CSS",
            "right_rate": null
        },
        {
            "id": 3,
            "cat_name": "JavaScript",
            "right_rate": null
        },
        {
            "id": 4,
            "cat_name": "Vue",
            "right_rate": null
        },
        {
            "id": 5,
            "cat_name": "Node",
            "right_rate": null
        },
        {
            "id": 6,
            "cat_name": "ES6",
            "right_rate": null
        }
    ]
})
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+/, 'get', {
    'ok': 1,
    'data|20-30': [
        {
            'id|+1': 1,
            'title': '@ctitle',
            'integer': '@integer(0,4)',
        }
    ]
})
// Mock.mock('http://localhost:9999/api/v1/users/register','get',{
//     'ok':1,
//     'username':'汤姆',
//     'password':'123123',
//     // 'token':'sdfpjsodfjhoshdfkj'
// })