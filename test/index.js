'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


// Declare internals

const internals = {
    logfilePath: './log/requestLog.txt'
};

const Request = require('../lib');
const Fs = require('fs');

describe('Experiment: sucsessfully log record.', () => {

    lab.before((done) => {

        // Recreate empty logfile before every test

        Fs.unlink(internals.logfilePath, (err) => {

            if (err) {
                throw err;
            };

            // console.log('successfully deleted ../log/requestLog.txt');

            done();
        });
    });

    it('log record', (done) => {

        const request = new Request(internals.logfilePath);

        // mock received request object from user.

        const requestData = { requestName: 'exampleRequest', data: 'sample data' };

        request.init(requestData);

        request.log('201', 'SUCCESS', 'actionName', { name: 'result object' });

        done();
    });

    it('retrieve record from the log file', (done) => {

        Fs.readFile(internals.logfilePath, (err, data) => {

            if (err) {
                throw err;
            }
            expect(err).to.not.exist();

            const record = JSON.parse(data);

            expect(record.statusMessage).to.equal('SUCCESS');
            done();
        });
    });

    it('success pretty print', (done) => {

        const request = new Request(internals.logfilePath);

        const requestData = { requestName: 'exampleRequest', data: 'sample data' };

        request.init(requestData);  //  sets startTime value for request.

        request.log('201', 'SUCCESS', 'actionName', { name: 'result object' });

        // Get coverage.

        request.pretty();
        done();
    });
});

describe('Experiment: fail to write log record.', () => {

    it('fail log record write coverage', (done) => {

        const request = new Request(internals.logfilePath);

        // Fs.appendFile(this.pathToLogFile, logRecordString, (err) => {
        const original = Fs.appendFile;

        Fs.appendFile = (pathToLogFile, logRecordString, callback) => {

            Fs.appendFile = original;
            return callback(new Error('appendFile failed'));
        };

        const requestData = { requestName: 'exampleRequest', data: 'sample data' };

        request.init(requestData);

        request.log('201', 'SUCCESS', 'actionName', { name: 'result object' });

        done();
    });
});
