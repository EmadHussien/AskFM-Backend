

const handleFake = async (req, res) => {
   
    res.json({username : req.user,  id:  req.id});
   
}

module.exports = {handleFake};