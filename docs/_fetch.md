# _fetch

fetch拓展函数

## Import
```jsx harmony
import { _fetch } from 'react-sextant'
//or
import _fetch from 'react-sextant/lib/common'
```
## Example

### Set Timeout
```jsx harmony
_fetch(url,{
    method:"GET",
    headers:{
        //...
    },
    timeout: 15000   //default 30*1000
}).then(res=>{

}).catch(err=>{

})
```

### Cancel Request
```jsx harmony
let task = _fetch(url,{...params})

task.then(()=>{ ... })
    // handle request cancelled rejection
    .catch(err=>{
        console.log(err)
    })
// cancel the request, the callback function is optional
task.cancel((err=> { ... }))
```

### Query Params
```jsx harmony
_fetch("http://example.com/list",{
    method:"GET",
    query:{
        page:1,
        pageSize:10
    }
})

// 相当于
_fetch("http://example.com/list?pag=1&pageSize=10",{
    method:"GET"
})
```
### Add a promise where the request may be terminated
```jsx harmony
// eg:监听断网时结束请求
import React from 'react';
import {NetInfo} from 'react-native';
import {_fetch} from "react-sextant";

export default class extends React.Component {
    componentDidMount() {
        this.task = _fetch(url,{
             method:"GET",
             headers:{},
             timeout:30000,
             race:[
                new Promise(function(resolve, reject){
                  NetInfo.getConnectionInfo().then((connectionInfo) => {
                    if(connectionInfo.type === 'none') reject(new Error('无网络连接'));
                  });
                })
            ],
          });

        this.task.then().catch();
    }

    componentWillUnmount() {
        this.task.cancel()
    }
}
```
