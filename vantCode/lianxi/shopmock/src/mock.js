import Mock from 'mockjs'
Mock.mock('https://localhost:9000/api/v1/swipe', 'get', {
    'ok': 1,
    'data|5': [
        {
            'img': '@dataImage(200x200)'
        }
    ]
})
Mock.mock('https://localhost:9000/api/v1/class', 'get', {
    'ok': 1,
    'data|12': [
        {
            'classname': '@ctitle(3,4)'
        }
    ]
})
// Mock.mock('https://localhost:9000/api/v1/shop', 'get', {
//     'ok': 1,
//     'data|10': [
//         {   'id|+1':1,
//             'img': '@dataImage(150x150)',
//             'shopname': '@ctitle(9,13)',
//             'price':'@integer(100,1000)'
//         }
//     ]
// })