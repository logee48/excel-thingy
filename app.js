const express = require('express');
const app = express();
const reader = require('xlsx')
const file = reader.readFile('./test1.xlsx')
const port = 3000;
const admin = require('firebase-admin');
const serviceAccount = require('./keyyy.json');
const { onValue, ref } = require('firebase/database');

// admin.initializeApp();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pythonconn-2578e-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

const db = admin.database();

var final_data = [];
app.get('/', (req, res) => {
  const timestamp = Date.now();
let data = [] 
db.ref('/path/to/data').set({
  "key1": 'value1',
  key2: 'value2'
});
var testt = {};
const feedback_stuff = ['Does your teacher come well prepared to the class?','Does the lecture provide conceptual clarity?','The course involves primarily descriptive topics. Explanation of the principles, linking concepts and ideas with real life applications through case studies and demonstration by the faculty?','Does your teacher provide more information than the text book?','Is the voice of your teacher clear and audible?','How are the communication skills of the faculty member?','Does your teacher hold attention of all the students in the class?']
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
   var aa = {};
   for(let i=0;i<temp.length;i++){
    const sno = temp[i].STAFF_CODE;
    const sec = temp[i].SEC;
    const scode = temp[i].SUB_CODE;
    const stcode = temp[i].STAFF_CODE;
    const sname = temp[i].STAFF_NAME;
    if (sno && sec && scode && stcode && sname){
        aa[0] = sno;
        aa[1] = sec;
        aa[2] = scode;
        aa[3] = stcode;
        aa[4] = sname;
    }
    // console.log(aa,temp[i].FEEDBACK_QUERY,temp[i].Very_Poor,temp[i].AVG_POINT);
    testt["Staff_Name"] = aa[4];
    testt["sub_code"] = aa[2];
    testt["staff_code"] = aa[3];
    testt["Total_Point"] = ((temp[i].AVG_POINT/5)*4)+((temp[i].AVG_POINT/5)*8)+((temp[i].AVG_POINT/5)*8)+((temp[i].AVG_POINT/5)*10)+((temp[i].AVG_POINT/5)*4)+((temp[i].AVG_POINT/5)*6)+((temp[i].AVG_POINT/5)*10);
    // testt[temp[i].FEEDBACK_QUERY] = (temp[i].AVG_POINT/5)*4;
    testt["before_change"] = temp[i].AVG_POINT;
    // testt[temp[i].FEEDBACK_QUERY] = (temp[i].FEEDBACK_QUERY == feedback_stuff[0]) ?(temp[i].AVG_POINT/5)*4:(temp[i].FEEDBACK_QUERY == feedback_stuff[1])?(temp[i].AVG_POINT/5)*8:(temp[i].FEEDBACK_QUERY == feedback_stuff[2])?(temp[i].AVG_POINT/5)*8:(temp[i].FEEDBACK_QUERY == feedback_stuff[3])?(temp[i].AVG_POINT/5)*10:(temp[i].FEEDBACK_QUERY == feedback_stuff[4])?(temp[i].AVG_POINT/5)*4:(temp[i].FEEDBACK_QUERY == feedback_stuff[5])?(temp[i].AVG_POINT/5)*6:(temp[i].AVG_POINT/5)*10;
    testt[temp[i].FEEDBACK_QUERY] = temp[i].AVG_POINT;
    // console.log(testt);
    var testt_val = 0;
    if(temp[i].FEEDBACK_QUERY == feedback_stuff[0]){
      testt_val = (temp[i].AVG_POINT/5)*4
    }
    else if(temp[i].FEEDBACK_QUERY == feedback_stuff[1]){
      testt_val = (temp[i].AVG_POINT/5)*8
    }
    else if(temp[i].FEEDBACK_QUERY == feedback_stuff[2]){
      testt_val = (temp[i].AVG_POINT/5)*8
    }
    else if(temp[i].FEEDBACK_QUERY == feedback_stuff[3]){
      testt_val = (temp[i].AVG_POINT/5)*10
    }
    else if(temp[i].FEEDBACK_QUERY == feedback_stuff[4]){
      testt_val = (temp[i].AVG_POINT/5)*4
    }
    else if(temp[i].FEEDBACK_QUERY == feedback_stuff[5]){
      testt_val = (temp[i].AVG_POINT/5)*6
    }
    else if(temp[i].FEEDBACK_QUERY == feedback_stuff[6]){
      testt_val = (temp[i].AVG_POINT/5)*10
    }
    db.ref('/excel/'+i).set({
      Staff_Name:aa[4],
      sub_code:aa[2],
      staff_code:aa[3],
      feedback :[testt_val,temp[i].FEEDBACK_QUERY]
    });
    final_data.push(testt);
   }
   
   temp.forEach((res) => { 
      data.push(res) 
   })
res.send(data)

});

app.get("/firebase",(req,res)=>{
  onValue(ref(db,"excel"),(snapshot)=>{
    const dataa1 = snapshot.val();
    const data = dataa1.map(({Staff_Name,sub_code,staff_code,feedback})=>({Staff_Name,sub_code,staff_code,[feedback[1]]:feedback[0]}))
    // res.send(new_data)
    const feedback_stuff = ['Does your teacher come well prepared to the class?','Does the lecture provide conceptual clarity?','The course involves primarily descriptive topics. Explanation of the principles, linking concepts and ideas with real life applications through case studies and demonstration by the faculty?','Does your teacher provide more information than the text book?','Is the voice of your teacher clear and audible?','How are the communication skills of the faculty member?','Does your teacher hold attention of all the students in the class?']
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
    const final_data = new_data.map(({Staff_Name,sub_code,staff_code,Total_point,feed})=>({Staff_Name,sub_code,staff_code,Total_point,[feed[0]]:feed[1],[feed[2]]:feed[3],[feed[4]]:feed[5],[feed[6]]:feed[7],[feed[8]]:feed[9],[feed[10]]:feed[11],[feed[12]]:feed[13]}))













    const ws = reader.utils.json_to_sheet(final_data) 
    reader.utils.book_append_sheet(file,ws,"okayyhmm")
    reader.writeFile(file,'./test.xlsx')
    res.send("done")
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
