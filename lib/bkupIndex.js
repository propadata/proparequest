'use strict';

const Fs = require('fs');

const internals = {};

exports = module.exports = function (pathToLogFile) {

    this.startTime = null;
    this.endTime = null;
    this.elapseTime = null;
    this.pathToLogFile = pathToLogFile;

    // console.log('pathToLogFile: ' + this.pathToLogFile);

    this.start = () => {
        this.startTime = Date.now();
    };

    this.stop = (callback) => {
        this.endTime = Date.now();
        this.elapseTime = this.endTime - this.startTime;
        callback.apply(this);
    };

    this.log = (statusCode, statusMessage, action, description) => {

        this.statusCode = statusCode;
        this.statusMessage = statusMessage; // ERROR | SUCCESS
        this.action = action;
        this.description = description;

        return this.stop(function () {

            const logfile = this.pathToLogFile;

            const logdata = {
                statusCode: this.statusCode,
                statusMessage: this.statusMessage,
                action: this.action,
                time: {
                    start: this.startTime,
                    stop: this.endTime,
                    elapse: this.elapseTime
                },
                description: this.description,
            };

            this.record = logdata;

            const logstring = JSON.stringify(logdata) + '\n';

            // console.log('TRACKER logstring ' + logstring);
            // console.log('TRACKER path ' + this.pathToLogFile);

            return Fs.appendFile(this.pathToLogFile, logstring, (err) => {

                return;
            });
        });
    };
    
    this.pretty = () => {
        
        console.log('\n\tRequest Pretty Print\n');
        console.log(JSON.stringify(this.record, null, '\t'));
    };

    this.print = () => {
        
        console.log('');
        console.log('   Tracker Print\n');
        console.log('   this.name ' + this.name);
        console.log('   this.message ' + this.message);
        console.log('   this.type ' + this.type);
    };

    return this;
};


