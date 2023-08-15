const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
 
const QuestionSchema = new mongoose.Schema(
    {
        asker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        question_text: {
            type: String,
            required: true
        },
        answer: {
            type: String,
        },

    }
    ,
    {
        timestamps : true
    }
);


module.exports = mongoose.model('Note', QuestionSchema);