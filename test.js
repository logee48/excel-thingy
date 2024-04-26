const data1 = require("./exported_data.json")
const data = require("./new_test.json")
const feedback_stuff = ['Does your teacher come well prepared to the class?','Does the lecture provide conceptual clarity?','The course involves primarily descriptive topics. Explanation of the principles, linking concepts and ideas with real life applications through case studies and demonstration by the faculty?','Does your teacher provide more information than the text book?','Is the voice of your teacher clear and audible?','How are the communication skills of the faculty member?','Does your teacher hold attention of all the students in the class?']

// var new_data = []
// var summ = 0
// var test_feed = []
// for(let i=0;i<data.length;i++){
//     summ += data[i][feedback_stuff[i]]
//     test_feed.push(feedback_stuff[i])
//     test_feed.push(data[i][feedback_stuff[i]])
//     if(i%5==0 && i!=0){
//         console.log(i);
//         var test = {
//             Staff_Name:data[i].Staff_Name,
//             staff_code:data[i].staff_code,
//             sub_code:data[i].sub_code,
//             Total_point:summ,
//             feed:test_feed
//         }
//         new_data.push(test)
//         test_feed = []
//         summ = 0
//     }
// }

// console.log(new_data);



var new_data = []
var summ = 0
var test_feed = []
var count = 0
for(let i = 0;i<data.length;i++){
    summ += data[i][feedback_stuff[count]]
    test_feed.push(feedback_stuff[count])
    test_feed.push(data[i][feedback_stuff[count]])
    count+=1
    if(count == 7){
        var test = {
            Staff_Name:data[i].Staff_Name,
            staff_code:data[i].staff_code,
            sub_code:data[i].sub_code,
            Total_point:summ,
            feed:test_feed
        }
        new_data.push(test)
        test_feed = []
        summ = 0
        count = 0
    }
}
console.log(new_data);