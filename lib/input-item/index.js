import {StyleSheet, TextInput,Image,TouchableOpacity,Platform} from "react-native";
import React from "react";
import {scaleSize} from "../common";
import View from '../view'

export default class extends React.PureComponent{
    static defaultProps = {
        clearButtonMode:"while-editing",
        maxLength:50,
        onFocus:Function,
        onBlur:Function,
        onChangeText:Function
    };

    constructor(props){
        super(props);
        this.state={
            visible:false,
        };
    }

    componentWillUpdate(nextProps) {
        let {visible} = this.state;
        if(!!nextProps.value&&!visible){
            this.setState({visible:true})
        }else if(visible){
            this.setState({visible:false})
        }
    }
    clear=()=>{
        this._root.clear();
        this.props.onChangeText('')
    };
    onFocus=()=>{
        this.setState({visible:!!this._root.props.value});
        this.props.onFocus();
    };
    onBlur=()=>{
        this.setState({visible:false});
        this.props.onBlur();
    };

    render(){
        return (
            <View style={[styles.input_box,{...this.props.style}]}>
                <View>
                    {this.props.children}
                </View>
                <View style={{flex:1,flexDirection: 'row',alignItems: "center"}}>
                    <TextInput
                        {...this.props}
                        ref={c => {
                            this._root = c
                        }}
                        style={[styles.input,this.props.inputStyle]}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        children={null}
                    />
                    {Boolean(Platform.OS==='android'&&this.state.visible)&&<TouchableOpacity onPress={this.clear} style={{backgroundColor: 'transparent',zIndex:999,marginLeft:scaleSize(-30)}}>
                        <Image source={require('./close.png')} resizeMode={'contain'} style={{width:scaleSize(15)}}/>
                    </TouchableOpacity>}
                </View>
                <View>
                    {this.props.extra}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    input_box: {
        width:'100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'white',
        justifyContent:'space-between'
    },
    input:{
        height: scaleSize(40),
        width:'100%',
        borderColor: '#EFEFEF',
        fontSize:scaleSize(14),
    }
});
