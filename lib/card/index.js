import React from "react";
import {Text, View,Dimensions} from "react-native";
import {scaleSize} from '../common'
const {width} = Dimensions.get('window');
const pad = width>600?scaleSize(44):scaleSize(15);
export default class Card extends React.Component {
    static Title = function (props) {
        return (
            <View style={props.style}>
                {typeof props.children === "string"?
                    <Text style={{fontSize:scaleSize(16,40),color:'#333',fontWeight:'500',paddingVertical:scaleSize(17,38)}}>{props.children}</Text>:
                    <React.Fragment>
                        {props.children}
                    </React.Fragment>
                }
            </View>
        )
    };

    render(){
        const props = this.props;
        const styles = props.type === 'full'?{
            backgroundColor:'#FFFFFF',
            width:'100%',
            marginTop:scaleSize(11),
            paddingHorizontal:scaleSize(15,44),
        }:{
            backgroundColor:'#FFFFFF',
            borderRadius:10,
            width:'94%',
            marginLeft: '3%',
            marginTop:scaleSize(11),
            paddingHorizontal:scaleSize(15,44),
            minHeight: 100,

        }
        return (
            <View style={[styles,props.style]}>
                {props.children}
            </View>
        )
    }
}
