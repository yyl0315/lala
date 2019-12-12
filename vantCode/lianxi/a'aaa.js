// function fz(x) {
//     let z = parseInt(x.toString().split('').reverse().join(''))
//     if (x < 0)
//         z *= -1
//         let max = Math.pow(2,30)-1
//     if (z > max) {
//         return 0
//     }
//     if (z < -1*max) {
//         return 0
//     }
//     return z
// };
// console.log(fz(-123)) 
// function fz(nums,target) {
//     let arr = new Array()
//     let ar = nums
//     for(let i =0; i<ar.length;i++){
//         for(let j = i+1;j<ar.length;j++){
//             if(ar[i]+ar[j]===target){
//                 arr.push(i,j)
//                 return arr
//             }
//         }
//     }
// };
// console.log(fz([2,5,5,11],10)) 
// function ad(x) {
//     if (parseInt(x.toString().split('').join(''))!= parseInt(x.toString().split('').reverse().join(''))) {
//         return false
//     } else {
//         return true
//     }
//     // return parseInt(x.toString().split('').reverse().join(''))
// }
// console.log(ad(121))
function ds(nums) {
    let j = 1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[j]) {
            j++;
            nums[j] = nums[i];
        }

    }
    return j
}
console.log(ds([1, 2, 1, 2, 3, 3, 3]))