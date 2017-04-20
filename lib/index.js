'use strict';

const Fs = require('fs');

const internals = {};

exports = module.exports = function (pathToLogFile) {


    this.startTime = null;
    this.endTime = null;
    this.elapseTime = null;
    this.pathToLogFile = pathToLogFile;

    // console.log('pathToLogFile: ' + this.pathToLogFile);

    this.init = (request) => {

        this.startTime = Date.now();
        this.request = request;
    };

    this.stop = (callback) => {

        this.endTime = Date.now();
        this.elapseTime = this.endTime - this.startTime;
        callback.apply(this);
    };

    this.log = (statusCode, statusMessage, action, result) => {

        this.statusCode = statusCode;
        this.statusMessage = statusMessage; // ERROR | SUCCESS
        this.action = action;
        this.result = result;

        return this.stop(function () {

            const logRecord = {
                statusCode: this.statusCode,
                statusMessage: this.statusMessage,
                action: this.action,
                time: {
                    start: this.startTime,
                    stop: this.endTime,
                    elapse: this.elapseTime
                },
                request: this.request,
                result: this.result
            };

            this.record = logRecord;

            const logRecordString = JSON.stringify(logRecord) + '\n';

            return Fs.appendFile(this.pathToLogFile, logRecordString, (err) => {

                if (err) {
                    return err;
                }

                return;
            });
        });
    };

    this.pretty = (callback) => {

        const prettyRecord = '\n\tRequest Pretty Print\n' + JSON.stringify(this.record, null, '\t');
        console.log(prettyRecord);
    };

    return this;
};


