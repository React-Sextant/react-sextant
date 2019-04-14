import {StyleSheet, TextInput,Image,TouchableOpacity,Platform} from "react-native";
import React from "react";
import {scaleSize} from "../common";
import View from '../view'

export default class InputItem extends React.Component {
    state={
        visible:false,
        value:''
    };

    clear=()=>{
        this._root.clear();
        this.setState({value:''});
        this.props.onChangeText('')
    };

    onFocus=()=>{
        if(this.state.value) this.setState({visible:true})
    };
    onBlur=()=>{
        this.setState({visible:false})
    };

    onChangeText=async (text)=>{
        await this.setState({value:text});
        if(this.state.value){
            this.setState({visible:true})
        }
        return this.props.onChangeText(text)
    };

    render(){
        return (
            <View style={[styles.input_box,{...this.props.style}]}>
                <View>
                    {this.props.children}
                </View>
                <View style={{flex:1,flexDirection: 'row',alignItems: "center"}}>
                    <TextInput
                        clearButtonMode={"while-editing"}
                        ref={c => {
                            this._root = c
                        }}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        placeholder={this.props.placeholder}
                        onChangeText={this.onChangeText}
                        value={this.props.value}
                        style={[styles.input,this.props.inputStyle]}
                        keyboardType={this.props.keyboardType}
                        secureTextEntry={this.props.secureTextEntry}
                        onSubmitEditing={this.props.onSubmitEditing}
                    />
                    {Boolean(Platform.OS==='android'&&this.state.visible)&&<TouchableOpacity onPress={this.clear} style={{backgroundColor: 'transparent',zIndex:999,marginLeft:-30,paddingHorizontal: 10}}>
                        <Image source={require('./close.png')} resizeMode={'contain'} style={{width:scaleSize(14)}}/>
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
        borderColor: '#EFEFEF',
        backgroundColor:'white',
        borderBottomWidth: 1,
        justifyContent:'space-between'
    },
    input:{
        height: scaleSize(40),
        width:'100%',
        borderColor: '#EFEFEF',
        fontSize:scaleSize(14),
    }
})
