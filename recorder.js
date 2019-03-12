
const { Consumer } = require('sqs-consumer');
const fs = require('fs');
//var AWS = require('aws-sdk');
//AWS.config.update({region: 'us-west-1'});

//var sqs = new AWS.SQS();

const app = Consumer.create({
    queueUrl: "https://sqs.us-east-1.amazonaws.com/968506304545/Reporting.fifo",
    messageAttributeNames: ['Artist', 'Album', 'Song', 'Date'], 
    handleMessage: async (message) => {
        //console.log('Processing message: ', message);
        logMessage(message.Body);
    }
});

app.on('error', (err) => {
    console.log("Error: " + err.message);
});

app.start();


function logMessage(message) {
    fs.appendFile("logs/playLog.txt", message + '\n', function(err) {
        if(err) {
            console.log("Error writing to log: ")
            return console.log(err);
        } 

        console.log("Saved message: " + message);
    });
}