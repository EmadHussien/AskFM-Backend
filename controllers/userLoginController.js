const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleLogin = async (req, res) =>{

    const {username ,pwd} = req.body;
    if(!username || !pwd) 
    {
       return res.status(400).json({'message':'username and password are required.'});
    }

    const foundUser = await User.findOne({username}).exec();
    if(!foundUser)
    {
        return res.status(401).json({'message': 'Unauthorized.'});
    }
    const matchingPwd = await bcrypt.compare(pwd,foundUser.password);
        
    if(matchingPwd)
    {
        const userID = foundUser._id.toString();
        // Generate Access and refresh Tokens
        const acessToken = jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.username ,
                    "id": userID
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60s'}
        );
        
        const refreshToken = jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
 
        try{
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);
            console.log('data ', Date(result.join_date))
            
            res.cookie('jwt',refreshToken,{httpOnly:true, maxAge: 24 * 60 * 60 * 1000});
            res.status(200).json({acessToken});
        }
        catch(err){
            res.status(500).json({'error':err.message});
        }
    }
    else{
        return res.status(401).json({'message': 'Unauthorized.'});
    } 
}

module.exports = {handleLogin};