
const mysql=require("mysql");
const express=require ("express");
const body=require("body-parser") ;

var my_app=express();
my_app.use(body.json());
my_app.use(body.urlencoded({extended:true}));


 var mydb= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"Toters",
    port:8889,
    
 });
my_app.get ("/allres",(req,res)=> {
    var myQuery=`SELECT * FROM Restaurant `;
mydb.query(myQuery,function(error,users,feld){
return res.send(users);
});

});
my_app.get ("/allmell",(req,res)=> {
    var myQuery=`SELECT * FROM Meals `;
mydb.query(myQuery,function(error,users,feld){
return res.send(users);
});

});
my_app.get ("/meels/:resto",(req,res)=>{
    var myQuery=`SELECT * FROM Meals WHERE Res_N=?`;
    mydb.query(myQuery,req.params.resto,function(error,mels,feld){
        return res.send(mels);
    })
});
my_app.listen(4000);

// my_app.post("/adduser",function(req,res){
//     var data={
//         // "id":req.body.id,
//         "NAME":req.body.NAME,
//         "TYPE":req.body.TYPE,
//         "TIME_WORK":req.body.TIME_WORK,
//     };
//     mydb.query(`INSERT INTO ahmed SET ?`,data,function(error,ans,feld){
//         if (error ){
//             res.send({
//                 "code":500,
//                 MsG:error
//             });

//         }else{
//             if(error)throw error;ثنث
//             return  res.send({
//                 "code":200,
//                 success:"yes "
//             });
//         }
//     })
// })

// my_app.post("/alluser/add",function(req,res){
// // data that you want to potst in DATA BACE
// var data={
//     // "id":req.body.i,
//     "User_name":req.body.u,
//     "Password":req.body.p,
//     "Email":req.body.e3,
				
// };
// var myQuery='INSERT INTO `User_info` SET ?';
// mydb.query(myQuery,data,function(error,ans,feld){
    
// if (error){

//   res.send({
    
//     "code":500,
//     MSG:error,
// })
// }
// else{
//     if (error) throw error;
//     else{
//       return  res.send({
//             "code":200,
//             success:"yes "
//         });
//     }
// };


// });
// });