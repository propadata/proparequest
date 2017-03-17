'use strict';

const Fs = require('fs');

const internals = {};

exports = module.exports = function (pathToLogFile) {

    this.startTime = null;
    this.endTime = null;
    this.elapseTime = null;
    this.logpath = pathToLogFile;

    console.log('pathToLogFile: ' + this.logpath);

    this.start = () => {
        this.startTime = Date.now();
    };

    this.stop = (callback) => {
        this.endTime = Date.now();
        this.elapseTime = this.endTime - this.startTime;
        callback();
    };

    this.log = (name, type, message) => {

        this.name = name;
        this.type = type;
        this.message = message;

        return this.stop(function () {

            const logfile = this.pathToLogFile;
            const logdata = {
                name: this.name,
                message: this.message,
                time: {
                    start: this.startTime,
                    stop: this.endTime,
                    elapse: this.elapseTime
                }
            };

            const logstring = JSON.stringify(logdata);

            return Fs.appendFile = (logfile, logstring, callback) => {

                return;
            };
        });
    };

    return this;
};


