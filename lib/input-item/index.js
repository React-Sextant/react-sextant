import {StyleSheet, TextInput} from "react-native";
import React from "react";
import {scaleSize} from "../common";
import View from '../view'

export default class InputItem extends React.Component {
    render(){
        return (
            <View style={[styles.input_box,{...this.props.style}]}>
                <View>
                    {this.props.children}
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        clearButtonMode={"while-editing"}
                        ref={c => {
                            this._root = c
                        }}
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onChangeText}
                        value={this.props.value}
                        style={[styles.input,this.props.inputStyle]}
                        keyboardType={this.props.keyboardType}
                        secureTextEntry={this.props.secureTextEntry}
                        onSubmitEditing={this.props.onSubmitEditing}
                    />
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
