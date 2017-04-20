# proparequest 

Record and track requests and performance.
propadata & groupthink performance tracker.
* configure log file.
* log request performance.
* pretty print results for inspection.

## log record object

proparequest writes below object to log file:

``` JavaScript
{
    "statusCode": "201",
    "statusMessage": "SUCCESS",
    "action": "actionName",
    "time": {
        "start": epoch time,
        "stop": epoch time,
        "elapse": "differece between start and stop" 
    },
    "request": "request object",
    "result": "result object"
}
```

## methods 
* [init(requestData)](#init-link)
* [log(statusCode, statusMessage, actionName, result)](#log-link)
* [pretty()](#pretty-link)
* *internal stop()*
    

## properties
    startTime
    endTime
    elapseTime
    pathToLogfile
    statusCode
    statusMessage
    action
    request
    result 


## Overview 

* 1) Generate Request object [new Request(pathToLogFile)](#generate-link)</a>
* 2) Initiate the request. [init(requestData)](#init-link)
* 3) Log completion of the request. [log(statusCode, statusMessage, actionName, result)](#log-link)

```JavaScript
const Request = require('proparequest');

const request = new Request(pathToLogFile); 

const requestData = { requestName: 'exampleRequest', data: 'sample data' };

request.init(requestData);

request.log('201', 'SUCCESS', 'userCreate', result);

```


#### <a name="generate-link">new Request(pathToLogFile)</a> 

Example below:
``` JavaScript
const Request = require('proparequest');

const request = new Request(pathToLogFile); 
```


#### <a name="init-link">init(requestData)</a> 

*requestData*: data received from user to make the request.

Example below:
```JavaScript
const Request = require('proparequest');

const request = new Request(pathToLogFile); 

const requestData = { requestName: 'exampleRequest', data: 'sample data' };

request.init(requestData);

request.log('201', 'SUCCESS', 'userCreate', result);

```

#### <a name="log-link">log(statusCode, statusMessage, actionName, result)</a> 

``` JavaScript
// log an error.
request.log('403', 'ERROR', 'userCreate', error);

// log a sussessfull request.
request.log('201', 'SUCCESS', 'userCreate', result);
```


#### <a name="pretty-link">pretty()</a> 

For debugging, prints log record object written to file. 
Print is pretty string format. <br/> 
JSON.stringify(object, null, '\t') 


