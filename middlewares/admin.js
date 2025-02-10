import { Admin } from "../db";

function adminMiddleware(req, res, next){
 //check headers and validate admin from adminDB
 const username = req.headers.username;
 const password = req.headers.password;

 Admin.findOne({
    username : username,
    password : password
 }).then(function(value){
    if(value){
        next();
    }else{
        res.status(403).json({
            msg : "User doesnt exist"
        });
    }
 })
}

module.exports =  adminMiddleware;