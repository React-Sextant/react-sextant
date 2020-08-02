import React from 'react'
import {View, StyleSheet, Animated, Easing} from 'react-native'

export default class ModalView extends React.PureComponent {
    static defaultProps = {
        animationType:"fade",
        onRequestClose:() => {},
        animate:() => {},
        visible: false,
        background:{backgroundColor:'black', opacity:0.4,}
    };

    constructor(props){
        super(props);
        this.state={
            modalVisible:this.props.visible,
            WIDTH:0,
            HEIGHT:150
        };
        this.animatedValue = new Animated.Value(0);

    }

    componentWillReceiveProps(nextProps) {
        if (this.shouldComponentUpdate(nextProps, null)) {
            this.setState({
                modalVisible: true,
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.visible || this.props.visible !== nextProps.visible) {
            return true;
        }
        if (nextState) {
            if (nextState.modalVisible !== this.state.modalVisible) {
                return true;
            }
        }
        return false;
    }

    animate=()=>{
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start(this.props.onShow);
    };

    onLayout = (e) => {
        this.setState({
            WIDTH:e.nativeEvent.layout.width,
            HEIGHT:e.nativeEvent.layout.height
        },()=>{
            this.animate()
        })
    };

    render(){
        let animatedStyle;
        switch (this.props.animationType) {
            case "slide":
                animatedStyle = {
                    transform: [
                        {
                            translateY: this.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [this.state.HEIGHT,0]
                            })
                        }
                    ]
                };
                break;
            case "fade":
                animatedStyle = {
                    // ...
                };
                break;
            case "spring":
                animatedStyle = {
                    // ...
                };
                break;
            case "vibrate":
                animatedStyle = {
                    // ...
                };
                break;
            case "none":
                animatedStyle = undefined;
                break;
            default:
                animatedStyle = this.props.animate({width:this.state.WIDTH,height:this.state.HEIGHT})
        }

        return (
            // UNDO: 1. children flex:1不能自动撑满 2. 动画
            this.state.modalVisible&&<View style={StyleSheet.compose(styles.container,this.props.style)}>
                <View style={StyleSheet.compose(StyleSheet.absoluteFill,this.props.background)} />
                <Animated.View style={animatedStyle} onLayout={this.onLayout}>
                    {this.props.children}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        zIndex:99999,
        justifyContent:'center',
        alignItems:'center'
    }
});
