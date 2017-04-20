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

describe('sucsessfully log record.', () => {

    lab.before((done) => {

        // Recreate empty logfile before every test

        Fs.unlink(internals.logfilePath, (err) => {

            if (err) throw err;

            console.log('successfully deleted ../log/requestLog.txt');

            done();
        });

    });

    it('log record', (done) => {
        
        const request = new Request(internals.logfilePath);

        // console.log(JSON.stringify(request));
        // console.log(JSON.stringify(Object.keys(request)));
        request.init();  //  sets startTime value for request.

        request.log('201', 'SUCCESS', 'actionName', { name: 'result object' });

        done();
    });

    it('retrieve record from the log file', (done) => {

        Fs.readFile(internals.logfilePath, (err, data) => {

              if (err) throw err;

              const record = JSON.parse(data);

              expect(record.statusMessage).to.equal('SUCCESS');
              done();
        });
    });

    it('success pretty print', (done) => {
        
        const request = new Request(internals.logfilePath);

        request.init();  //  sets startTime value for request.

        request.log('201', 'SUCCESS', 'actionName', { name: 'result object' });

        // Gets coverage.

        request.pretty(); 
        done();
    });
});
