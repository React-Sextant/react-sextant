import {Dimensions, PixelRatio} from "react-native";

/**
 * ui设计基准,iphone 6 2倍图
 * width:750px
 * height:1334px
 *
 * @description pad 1080
 * @description phone 375
 *
 */
export function scaleSize(size,padSize) {
    let screenW = Dimensions.get('window').width>Dimensions.get('window').height?Dimensions.get('window').height:Dimensions.get('window').width;
    const phone = screenW<330?330:375;  //iPhone SE
    const pad = 1080;
    if(padSize){
        return Number((screenW<517?size * screenW / phone:padSize * screenW / pad).toFixed(2))
    }else {
        return Number((screenW<517?size * screenW / phone:size * 2 * screenW / pad).toFixed(2))
    }
}

/**
 * _setTimeout
 *
 * @func function
 * @time 0 - indefinite
 * **/
export function _setTimeout(func,time){
    if(!isNaN(time) && time > 0){
        return setTimeout(()=>{
            func()
        },time)
    }
}

export function asyncSleep(delay){
    return new Promise((resolve, reject) => setTimeout(resolve, delay))
}

/**
 * retry
 * 重试一个异步请求,async-retry的简单版
 *
 * @param asyncRequest 异步请求
 * @param times 重试次数
 * @param delay 重试延迟
 * **/
export async function retry(asyncRequest, times, delay){
    try{
        return await asyncRequest();
    }
    catch(err){
        if(--times){
            await asyncSleep(delay);
            return await retry(asyncRequest, times, delay);
        } else {
            throw err;
        }
    }
}

/**
 * _fetch
 *
 * @param url
 * @param params {timeout, query, race}
 *
 * <code>
 *   let task = _fetch(url,{
 *      method:"GET",
 *      headers:{},
 *      timeout:30000,
 *      race:[],            // Add a promise where the request may be terminated
 *   });
 *
 *   task.then().catch()    // promise
 *   task.cancel()          // abort request
 * </code>
 *
 * @return Promise{cancel}
 * **/
export const _fetch = (url,params)=>{
    let controller = new AbortController;
    let promiseResolve;
    let promiseReject;
    let timer;

    /**************** Promise.race winner ****************/
    let promise = new Promise((resolve,reject)=>{
        promiseResolve = (...arg)=>{clearTimeout(timer);resolve(...arg)};
        promiseReject = (...arg)=>{clearTimeout(timer);controller.abort();reject(...arg)};

    if(params.query && Object.getOwnPropertyNames(params.query).length>0){
        Object.keys(params.query).forEach(key => {
            url += (url.indexOf('?') === -1 ? '?' : '&') + key+"="+params.query[key];
            // delete params.query[key] // not a pure function
        })
    }
        Promise.race([
            /**************** ajax ****************/
            fetch(url,{
                signal:controller.signal,
                ...params
            }),
            /**************** time out ****************/
            new Promise((resolve,reject)=>{
                timer = _setTimeout(() => {
                    controller.abort(); //timeout abort request
                    reject(new Error("timeout "+(params.timeout)+"ms"));
                }, params.timeout||0)
            }),
            ...(params.race||[])
        ]).then(res => {
            promiseResolve(res)
        }).catch(err => {
            promiseReject(err)
        })
    });

    promise.cancel = () =>{
        controller.abort();
        promiseReject(new Error("canceled"))
    };

    return promise
};
