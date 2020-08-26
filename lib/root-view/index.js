import React, {Component} from "react";
import {StyleSheet, AppRegistry, View} from 'react-native';

let viewRoot = null;

class RootView extends Component {
    constructor(props){
        super(props);
        viewRoot = this;
        this._queue = [];
        this.state={
            toast:null
        }
    }

    render(){
        return (
            React.Children.count(this.state.toast)>0&&<View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                {this.state.toast}
            </View>
        )
    }

    static setView = (view) => {
        if(React.isValidElement(view)){
            viewRoot._queue = [view];
            viewRoot.setState({toast: view})
        }
    };

    static hide = () => {
        viewRoot._queue = [];
        viewRoot.setState({toast: null})
    };

    static add = (view) => {
        if(React.isValidElement(view)){
            viewRoot._queue.push({...view,key:new Date().getTime()});
            viewRoot.setState({toast: viewRoot._queue});
            return viewRoot._queue.length-1
        }
        return undefined
    };

    static remove = (key) => {
        if(typeof key === "number"){
            viewRoot._queue.splice(key,1);
        }else {
            viewRoot._queue.splice(-1,1);
        }
        viewRoot.setState({toast: viewRoot._queue});
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
