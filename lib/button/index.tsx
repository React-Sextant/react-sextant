import React from 'react';
import { Text, TouchableOpacity, StyleProp, StyleSheet, ActivityIndicator } from 'react-native';

enum TypeEnum {
    primary="primary",
    ghost="ghost"
}
enum SizeEnum {
    small="small",
    large="large"
}
interface ActivityIndicatorProps {
    animating?:Boolean,
    color?:Boolean,
    size?:SizeEnum | number,
    hidesWhenStopped?:Boolean
}
interface ButtonProps {
    color?:String,
    style?:StyleProp,
    type?:TypeEnum,
    title:String|React.ReactNode,
    titleStyle?:StyleProp,
    loading?:Boolean,
    loadingProps?:ActivityIndicatorProps
}

export default class Button extends React.PureComponent<ButtonProps,any> {
    static defaultProps={
        color:"#1C8CE3",
        type:TypeEnum.primary,
        titleStyle:{}
    };
    private props: any;
    render(){
        const {
            color,
            style,
            type,
            title,
            titleStyle,
            loading,
            loadingProps,
            children
        } = this.props;
        const btnStyle = {
            [TypeEnum.ghost]:{
                borderColor:color,
                backgroundColor:'transparent'
            },
            [TypeEnum.primary]:{
                borderColor:color,
                backgroundColor:color
            }
        };
        const _color = type===TypeEnum.ghost?color:"#FFFFFF";
        return (
            <TouchableOpacity {...this.props} style={[styles.btn, btnStyle[type],style]}>
                {loading&&<ActivityIndicator color={_color} {...loadingProps}  />}
                {React.isValidElement(title)?title:
                    <Text style={[
                        styles.title,
                        {color:_color},
                        titleStyle
                    ]}>{title}</Text>}
                {children}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        paddingHorizontal:10,
        paddingVertical:5,
        fontSize:16
    },
    btn: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
