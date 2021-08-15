import React, {Component} from "react";
import {StyleSheet, AppRegistry, View, DeviceEventEmitter} from 'react-native';

class RootView extends Component {
    constructor(props){
        super(props);
        this.state={
            toast:[]
        };
    }

    render(){
        return (
            React.Children.count(this.state.toast)>0&&<View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                {this.state.toast}
            </View>
        )
    }

    componentDidMount() {
        DeviceEventEmitter.addListener("RootView_setView",this.setView,this);
        DeviceEventEmitter.addListener("RootView_hide",this.hide,this);
        DeviceEventEmitter.addListener("RootView_add",this.add,this);
        DeviceEventEmitter.addListener("RootView_remove",this.remove,this);
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeListener("RootView_setView",this.setView);
        DeviceEventEmitter.removeListener("RootView_hide",this.hide);
        DeviceEventEmitter.removeListener("RootView_add",this.add);
        DeviceEventEmitter.removeListener("RootView_remove",this.remove);
    }

    setView=({view,cb})=>{
        if(React.isValidElement(view)){
            this.setState({toast: [view]},cb)
        }
    };

    hide = () => {
        this.setState({toast: []})
    };

    add = ({view,cb,key}) => {
        this.setState(preState=>{
            return {toast:[...preState.toast,{ ...view,key}]}
        },cb);
    };

    remove = ({key,cb}) => {
        this.setState(state => ({
            toast: state.toast.filter(item=>item.key !== key)
        }),cb);
    };

    static setView = (view,cb) => {
        DeviceEventEmitter.emit("RootView_setView",{view,cb})
    };
    static hide = () => {
        DeviceEventEmitter.emit("RootView_hide")
    };
    static add = (view,cb) => {
        if(React.isValidElement(view)){
            const key = new Date().getTime();
            DeviceEventEmitter.emit("RootView_add",{view,cb,key});
            return key
        }
        return undefined
    };
    static remove = (key,cb) => {
        DeviceEventEmitter.emit("RootView_remove",{key,cb});
    };
}

AppRegistry.setWrapperComponentProvider(function() {
    return function RootSiblingsWrapper(props) {
        return (
        <React.Fragment>
            {props.children}
            <RootView/>
        </React.Fragment>
        );
    };
});

export default RootView;
