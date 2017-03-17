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

    this.log = (name, message, status) => {

        this.name = name;
        this.status = status;
        this.message = message;

        return this.stop(function () {

            const logfile = this.pathToLogFile;
            const logdata = {
                status: this.status,
                name: this.name,
                message: this.message,
                time: {
                    start: this.startTime,
                    stop: this.endTime,
                    elapse: this.elapseTime
                }
            };

            const logstring = JSON.stringify(logdata) + '\n';
            // console.log('TRACKER logstring ' + logstring);
            // console.log('TRACKER path ' + this.pathToLogFile);

            return Fs.appendFile(logfile, logstring, (err) => {

                return;
            });
        });
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


