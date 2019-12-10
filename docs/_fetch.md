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
