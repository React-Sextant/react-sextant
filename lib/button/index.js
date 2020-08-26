import React from 'react';
import { Text,TouchableOpacity,StyleSheet } from 'react-native';

class Button extends React.PureComponent {
    static defaultProps={
        color:"#1C8CE3",
        type:"primary",
        titleStyle:{}
    };
    render(){
        const btnStyle = {
            ghost:{
                borderColor:this.props.color,
                backgroundColor:'transparent'
            },
            primary:{
                borderColor:this.props.color,
                backgroundColor:this.props.color
            }
        };
        return (
            <TouchableOpacity {...this.props} style={[styles.btn, btnStyle[this.props.type],this.props.style]}>
                <Text style={[
                    styles.title,
                    {color:this.props.type==="ghost"?this.props.color:"#FFFFFF"},
                    this.props.titleStyle
                ]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

export default Button;

const styles = StyleSheet.create({
    title:{
        paddingHorizontal:10,
        paddingVertical:5,
        fontSize:16
    },
    btn: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
