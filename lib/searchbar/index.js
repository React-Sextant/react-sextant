import React from "react";
import {TextInput,Image, View} from "react-native";

export default class Searchbar extends React.PureComponent {
    render(){
        return (
            <View style={{backgroundColor:'white',borderRadius:22,justifyContent:'center',...this.props.style}}>
                <Image source={require('./search.png')} style={{position:'absolute',left:20}}/>
                <TextInput
                    style={{height: 35,paddingLeft:40}}
                    placeholder={"输入关键词搜索"}
                />
            </View>
        )
    }
}
