import React from 'react'
import {View,Animated,Easing,Modal,StyleSheet} from 'react-native'

class ActionSheet extends React.Component {
    static defaultProps = {
        animationType:"fade",
        transparent:true,
        onRequestClose:() => {},
        background:{backgroundColor:'black', opacity:0.4,}
    };

    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.HEIGHT=150
    }

    onLayout = (e) => {
        this.HEIGHT=e.nativeEvent.layout.height
    };

    animate=()=>{
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    };

    close=()=>{
        Animated.timing(
            this.animatedValue,
            {
                toValue: 0,
                duration: 200,
                easing: Easing.linear
            }
        ).start(this.props.close);
    };

    render(){
        const rotate= {
            transform: [
                {
                    translateY: this.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [this.HEIGHT,0]
                    })
                }
            ]
        };
        return (
            <Modal {...this.props} onShow={this.animate}>
                <View style={StyleSheet.compose(StyleSheet.absoluteFill,this.props.background)} />
                <View style={{flex:1,backgroundColor:'transparent'}} onStartShouldSetResponder={this.close}/>
                <Animated.View style={rotate} onLayout={this.onLayout}>
                    {this.props.children}
                </Animated.View>
            </Modal>
        )
    }
}

export default ActionSheet
