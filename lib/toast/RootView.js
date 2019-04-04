import React, {Component} from "react";
import {StyleSheet, AppRegistry, View,Platform,ProgressViewIOS} from 'react-native';
import * as Progress from '../../../react-native-progress';

let viewRoot = null;

class RootView extends Component {
    constructor(props) {
        super(props);
        viewRoot = this;
        this.state = {
            toast: null,
            progressNum:0,
        }
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.rootView} pointerEvents="box-none" zIndex={999}>
                    {this.state.progressNum===0?
                    this.state.toast:
                        Platform.OS==='android'?
                        <Progress.Circle
                        style={styles.progress}
                        progress={this.state.progressNum}
                        size={84}
                        unfilledColor="rgba(255,255,255,0.5)"
                        color={"#BA9866"}
                        thickness={6}
                        showsText={true}
                        textStyle={{fontSize:20,color:'#BA9866',alignSelf:'center'}}
                    />:
                        <ProgressViewIOS progress={this.state.progressNum}/>
                    }
                </View>

            </React.Fragment>
        )
    }

    static setView = (view) => {
        viewRoot.setState({toast: view})
    };

    static setLoading = (progress) => {
        viewRoot.setState({progressNum: progress})
    }
}


const originRegister = AppRegistry.registerComponent;

AppRegistry.registerComponent = (appKey, component) => {

    return originRegister(appKey, function () {
        const OriginAppComponent = component();

        return class extends Component {
            render() {
                return (
                    <View style={styles.container}
                          onStartShouldSetResponder={()=>RootView.setLoading(0)}
                    >
                        <View style={{flex:1}} zIndex={1}>
                            <OriginAppComponent/>
                        </View>
                        <RootView/>
                    </View>
                );
            };
        };
    });
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'transparent',
        position: 'relative',
    },
    rootView: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
    },
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
});
export default RootView
