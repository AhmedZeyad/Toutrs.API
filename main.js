// msql var represant mysql librare
const mysql=require("mysql");
// express var represant express librare

const express =require ("express");
// body-parser var represant body-parser librare

const body=require("body-parser") ;
// her  var my_app reqresant my applaction
var my_app=express();
// her i told my applacation to use jason and urld encoded

my_app.use(body.json());
my_app.use(body.urlencoded({extended:true}));

//  the info of my data nase
 var mydb= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"Toters",
    port:8889,
    
 });
//  alllres to get all restorent info in data bace
//  req request 
//  res respons
my_app.get ("/allres",(req,res)=> {
    var myQuery=`SELECT * FROM Restaurant `;
mydb.query(myQuery,
    // error represant eroor
    // users represant the anser
    // feld idont know
    function(error,users,feld){
return res.send(users);
});

});
//  allmell to get all meall info in data bace

my_app.get ("/allmell",(req,res)=> {
    var myQuery=`SELECT * FROM Meals `;
mydb.query(myQuery,function(error,mell,feld){
return res.send(mell);
});

});
// meels/:resto to get the meals of spasifc restorent
my_app.get ("/meels/:resto",(req,res)=>{
    var myQuery=`SELECT * FROM Meals WHERE Res_N=?`;
    mydb.query(myQuery,req.params.resto,function(error,mels,feld){
        return res.send(mels);
    })
});
//add user 

my_app.post("/adduser",function(req,res){
    var myQuery=`INSERT INTO Userinfo SEt ?`
    // User_info the data that was send to data bace
    var User_info={
        "user_name":req.body.user_name,
"Nickname":req.body.Nickname,
"DateOfBirth":req.body.DateOfBirth,
"Email":req.body.Email,
"PhonNymber":req.body.PhonNymber,
"Point":req.body.Point,
"password":req.body.password,
    };
    mydb.query(myQuery,User_info,function(error,anser,feld){

        if(error){
            res.send({
            "code":500,
            MSG:error
        })
        }
    else{if(error){throw error}
return res.send({
    "cood":200,
    MSG:"good jab"
})
}
});});
// simple check fo emal and password  by send emali 
// to data bace to get password and in app we will check the pasword

my_app.get ("/check/:Email/",(req,res)=>{
    var myQuery=`SELECT  password FROM Userinfo WHERE Email=?`;
    // Email prameter represant the user emal
    mydb.query(myQuery,req.params.Email,function(error,anser,feld){
        if(error){console.log(error)}
        return res.send(anser);
    });
});
//  singup
my_app.post("/singup",function(req,res){
    var myQuery=`INSERT INTO Userinfo SET ?`
    var User_SingUp={
        
 "user_name":req.body.user_name,
"Email":req.body.Email,
"PhonNymber":req.body.PhonNymber,
"password":req.body.password,
    };
    mydb.query(myQuery,User_SingUp,function(error,anser,feld){
        if(error){
            res.send({
            "code":500,
            MSG:error
        });
        }
    else{if(error){throw error}
return res.send({
    "cood":200,
    MSG:"good jab"
});
}
});});
my_app.get("/GetUserInf/:Email",function(req,res){
    myQuery=`SELECT * FROM Userinfo WHERE Email=?`;
    mydb.query(myQuery,req.params.Email,function(error ,info,feld){
        if(error){console.log(error)}
        return res.send(info);
    })
});
my_app.get("/offres",function(req,res){
    var  myQuery=(`SELECT * FROM Offres`);
    mydb.query(myQuery,function(error,anser,feld){
        if (error){console.log(error)
        }
        return res.send(anser);
    });
});
my_app.listen(4000)