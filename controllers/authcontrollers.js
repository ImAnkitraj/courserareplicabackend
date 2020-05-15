var bcrypt = require('bcrypt');

//Models
var user = require('../models/user')

//Bcrypt saltRounds
const saltRounds =  10;

//Login controller
async function login(email, password,res){

    if(email ==  "" || password == ""){
        res.status(200).send({
            status:false,
            message:"All fields are required"
        })
    }

    else{
        await user.findOne({email:email},(err,user)=>{
            if(err){
              res.status(200).send({
                status:false,
                message:"Something went wrong",
              })
            }
            else if(user){
            //   console.log('found user' + user);
              bcrypt.compare(password, user.password, function(err, result){
                if(result == true){
                  res.status(200).send({
                    status:true,
                    message:"Successful Logged you in",
                    user: user,
                  })
                }else{
                  res.status(200).send({
                    status:false,
                    message:"Password is wrong try again"
                  })
                }
              })
            }
            else{
              res.status(200).send({
                status:false,
                message:"Username not found"
              })
            }
        })
    }
}

//Signup controller
async function signup(email,password,res){
    if(email ==  "" || password == ""){
        res.status(200).send({
            status:false,
            message:"All fields are required"
        })
    }
    else{
        bcrypt.hash(password, saltRounds, function(err, hash){
            if(err){
                res.status(200).send({
                    status:false,
                    meassage:"error"
                })
            }
            else{
                var newuser = new user({
                    email:email,
                    password:hash,
                })
                newuser.save((err,newUser)=>{
                    if(err){
                        res.status(200).send({
                            status:false,
                            message:"Not signed up"
                        })
                    }
                    else{
                        res.status(200).send({
                            status:true,
                            message:" signed up",
                            user:newUser
                        })
                    }
                })
            }
        })
    }
}


module.exports={
    login,
    signup,
}