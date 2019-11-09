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
        return screenW<517?size * screenW / phone:padSize * screenW / pad
    }else {
        return screenW<517?size * screenW / phone:size * 2 * screenW / pad
    }
}

/**
 * _setTimeout
 *
 * @func function
 * @time 0 - indefinite
 * **/
export function _setTimeout(func,time){
    if(time > 0 || !time){
        return setTimeout(()=>{
            func()
        },time)
    }
}

/**
 * _fetch
 *
 * @description
 let task = _fetch(url,{
    method:"GET",
    headers:{},
    timeout:30000
 })

 task.then().catch()    // promise
 task.cancel()          // abort request
 task.race.push()       // Add a promise where the request may be terminated
 * **/
export const _fetch = (url,params)=>{
    let controller = new AbortController;
    let promiseResolve;
    let promiseReject;

    /**************** Promise.race winner ****************/
    let promise = new Promise((resolve,reject)=>{
        promiseResolve = resolve;
        promiseReject = reject;

        Promise.race([
            /**************** ajax ****************/
            fetch(url,{
                signal:controller.signal,
                ...params
            }),
            /**************** time out ****************/
            new Promise((resolve,reject)=>{
                _setTimeout(() => {
                    controller.abort(); //timeout abort request
                    reject(new Error("timeout"));
                }, params.timeout||0)
            })
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
