const {format}  = require('date-fns');
const {v4:uuid} = require('uuid');
const fsPromisess = require('fs').promises;
const fs = require('fs');
const path = require('path');

const logEvents = async (message,logFileName) =>{
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs')))
        {
            await fsPromisess.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromisess.appendFile(path.join(__dirname,'..','logs',logFileName),logItem);
    }catch(e)
    {
        console.log(e);
    }
}

const logger = (req,res,next) =>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log');
    console.log(`${req.method}\t${req.path}`);
    next();
}

module.exports = {logEvents,logger};