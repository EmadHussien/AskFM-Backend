const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleNewUser = async (req, res) =>{
    const {username ,pwd,bio,location, nickname } = req.body;
    console.log(username, pwd,bio,location, nickname);
    if(!username || !pwd || !location || !nickname) 
    {
       return res.status(400).json({'message':'username and password are required.'});
    }
    
    const checkDuplicate = await User.findOne({username: username}).exec();
    if(checkDuplicate)
    {
        return res.status(409).json({'message':'Username already taken.'});
    }
    try{

        const hashedPwd = await bcrypt.hash(pwd,10);
        const newUser = await User.create(
            {
                'username': username,
                'password': hashedPwd,
                'nickname': nickname,
                'location': location,
                'bio': bio ? bio : ''
            });
            
        console.log(newUser);
        const userID = newUser._id.toString();
         // Generate Access and refresh Tokens
        const accessToken = jwt.sign(
        {
            "UserInfo":{
                "username":newUser.username ,
                "id": userID
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '60s'}
        );
        const refreshToken = jwt.sign(
            {"username":newUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        newUser.refreshToken = refreshToken;
        const result = await newUser.save()
        console.log(result);
        res.cookie('jwt',refreshToken,{httpOnly:true, maxAge: 24 * 60 * 60 * 1000});
     
        res.status(201).json({
            'success': true,
            'message': `New user ${username} is created successfully!`,
            'data': {
              'accessToken': accessToken
            }
          });
        
        }
    catch(err){
        res.status(500).json({'error':err.message});
    }  
}

module.exports = {handleNewUser};