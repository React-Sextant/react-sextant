import {Dimensions, ImageBackground,TouchableOpacity} from "react-native";
import React from "react";
import {scaleSize} from '../common'

export default class Avatar extends React.Component {
    render(){
        let size = {};
        switch (this.props.size) {
            case 'big':
                size = {
                    width:scaleSize(70,153),
                    height:scaleSize(70,153),
                    borderRadius:scaleSize(35,76.5)
                };
                break;
            case 'middle':
                size = {
                    width:scaleSize(37),
                    height:scaleSize(37),
                    borderRadius:scaleSize(20)
                };
            default:
                size = {
                    width:scaleSize(50),
                    height:scaleSize(50),
                    borderRadius:scaleSize(25)
                };
                break;
        }
        return (
            <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.onPress} style={{backgroundColor:'transparent'}}>
                <ImageBackground
                    source={Boolean(this.props.source&&this.props.source.uri)?{uri:this.props.source.uri||'',cache: 'force-cache'}:require('./default.png')}
                    style={[this.props.style,size,{backgroundColor:'#F7F7F7'}]}
                    defaultSource={require('./default.png')}
                    imageStyle={[this.props.style,size]}
                >
                    {this.props.children}
                </ImageBackground>
            </TouchableOpacity>
        )
    }

}
