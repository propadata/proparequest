# proparequest 

request object to manage rethindb request results.
propadata & groupthink performance tracker.
* configure log file.
* log request performance.
* pretty print results for inspection.


## methods
    * [init(pathToLogFile)](#init-link)
    * [log(statusCode, statusMessage, actionName, result)](#log-link)
    * pretty()
    * stop()
    

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

#### <a name="init-link">init(pathToLogFile)</a> 

*pathToLogFile* a single string.

Example below:
```
const Tracker = require('proparequest');

const Request = new Tracker(pathToLogFile); 

```

#### <a name="init-log">log(statusCode, statusMessage, actionName, result)</a> 


```
// log an error.
request.log('403', 'ERROR', 'userCreate', error);

// log a sussessfull request.
request.log('201', 'SUCCESS', 'userCreate', result);
```

