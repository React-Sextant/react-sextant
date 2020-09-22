import React, {Component} from "react";
import {StyleSheet, AppRegistry, View} from 'react-native';

let viewRoot = null;

class RootView extends Component {
    constructor(props){
        super(props);
        viewRoot = this;
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

    static setView = (view,cb) => {
        if(React.isValidElement(view)){
            viewRoot.setState({toast: [view]},cb)
        }
    };

    static hide = () => {
        viewRoot.setState({toast: []})
    };

    static add = (view,cb) => {
        if(React.isValidElement(view)){
            const key = new Date().getTime();
            viewRoot.setState(preState=>{
                return {toast:[...preState.toast,{ ...view,key}]}
            },cb);
            return key
        }
        return undefined
    };

    static remove = (key,cb) => {
        viewRoot.setState(state => ({
            toast: state.toast.filter(item=>item.key !== key)
        }),cb);
    };
}

const originRegister = AppRegistry.registerComponent;

AppRegistry.registerComponent = (appKey, component) => {

    return originRegister(appKey, function () {
        const OriginAppComponent = component();

        return class extends Component {
            render() {
                return (
                    <React.Fragment>
                        <OriginAppComponent/>
                        <RootView/>
                    </React.Fragment>
                );
            };
        };
    });
};

export default RootView;
