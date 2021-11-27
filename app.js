const express=require("express");

const bodyParser=require("body-parser");

const http=require("https");

const request=require("request");

const app=express();

const port=2001;

app.listen(process.env.PORT || port,function(){
    console.log("server is running at port "+port);
});

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html");


});

app.post('/',function(req,res){
var fname= req.body.fname;
var lname=req.body.lname;
var email=req.body.email;

var data={
    members : [
        {
            email_address: email,
            status : "subscribed",
            merge_fields : {
                FNAME: fname,
                LNAME: lname
            }
        }
    ]
}

var jsonData= JSON.stringify(data);

const url= "https://us1.api.mailchimp.com/3.0/lists/74e2df9d94 "

const options={

    method:"POST",
    auth:"aaroodh1:bd5e314a11d554e3eceb225af020d559-us1"

}
const request=http.request(url,options,function(response){
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
request.write(jsonData);

request.end();   


});
   
res.write(email+' is registered successfully!');
res.end();

});


// api=bd5e314a11d554e3eceb225af020d559-us1
//list id==74e2df9d94 