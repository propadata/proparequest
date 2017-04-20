# proparequest 

Records every database request to a log file to 
track requests made and performance. 
request object to manage rethindb request results.
propadata & groupthink performance tracker.
* configure log file.
* log request performance.
* pretty print results for inspection.

## log record object

proparequest writes below object to log file:

```
{
    "statusCode": "201",
    "statusMessage": "SUCCESS",
    "action": "actionName",
    "time": {
        "start": epoch time,
        "stop": epoch time,
        "elapse": "differece between start and stop" 
    },
    "result": "result object"
}
```

## methods
    * [init(pathToLogFile)](#init-link)
    * [load(request)](#load-link)
    * [log(statusCode, statusMessage, actionName, result)](#log-link)
    * [pretty()](#pretty-link)
    * *internal stop()*
    

## properties
    start
    end
    elapse
    pathToLogfile
    statusCode
    statusMessage
    action
    result 


## example usage

* 1) Generate Request object [new Request(pathToLogFile)](#generate-link)</a>
* 2) Initiate the request. [init(requestData)](#init-link)
* 3) Log completion of the request. [log(statusCode, statusMessage, actionName, result)](#log-link)

#### <a name="generate-link">new Request(pathToLogFile)</a> 

Example below:
```
const Request = require('proparequest');

const request = new Request(pathToLogFile); 
```


#### <a name="init-link">init(requestData)</a> 

*requestData* data received from used to make the request.

Example below:
```
const Request = require('proparequest');

const request = new Request(pathToLogFile); 

const requestData = { requestName: 'exampleRequest', data: 'sample data' };

request.init(requestData);

request.log('201', 'SUCCESS', 'userCreate', result);

```

#### <a name="log-link">log(statusCode, statusMessage, actionName, result)</a> 

```
// log an error.
request.log('403', 'ERROR', 'userCreate', error);

// log a sussessfull request.
request.log('201', 'SUCCESS', 'userCreate', result);
```


#### <a name="pretty-link">pretty()</a> 

For debugging, prints log_record object in pretty string format.


