const express = require('express');
const app = express();
const reader = require('xlsx')
// const file = reader.readFile('./test_data.xlsx')
const file = reader.readFile('./test1.xlsx')
const port = 3000;
const admin = require('firebase-admin');
const serviceAccount = require('./keyyy.json');

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
  
// const sheets = file.SheetNames[0]
  
// for(let i = 0; i < sheets.length; i++) 
// { 
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
    const ballboi = temp[i].FEEDBACK_QUERY;
    db.ref('/excel/'+i).set({
      Staff_Name:aa[4],
    sub_code:aa[2],
    staff_code:aa[3],
    Total_Point:((temp[i].AVG_POINT/5)*4)+((temp[i].AVG_POINT/5)*8)+((temp[i].AVG_POINT/5)*8)+((temp[i].AVG_POINT/5)*10)+((temp[i].AVG_POINT/5)*4)+((temp[i].AVG_POINT/5)*6)+((temp[i].AVG_POINT/5)*10),
    testtt :[temp[i].AVG_POINT,temp[i].FEEDBACK_QUERY]
    });
    final_data.push(testt);
    console.log(i);
    
    
    // console.log(testt);


   }
   
   temp.forEach((res) => { 
      data.push(res) 
   })
  //  console.log(final_data);
// } 
res.send(data)
// console.log(data);

});


app.get("/new",(req,res)=>{
let student_data = [{ 
	Student:'Nikhil', 
	Age:22, 
	Branch:'ISE', 
	Marks: 70 
}, 
{ 
	Student:'Amitha', 
	Age:21, 
	Branch:'EC', 
	Marks:80 
}] 

const ws = reader.utils.json_to_sheet(final_data) 
// const ws = reader.utils.json_to_sheet(student_data)

reader.utils.book_append_sheet(file,ws,"real_test2") 
reader.writeFile(file,'./test.xlsx') 
res.send("done")
})

app.get("/mod",(req,res)=>{
    reader.utils.sheet_add_aoa(file,[[1],,[]])
    reader.writeFile(file,"./test/xlsx")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
