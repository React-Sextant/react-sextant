import {TouchableOpacity, Text, Platform, Image, ImageBackground, StyleSheet, Dimensions} from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import OfflineNotice from '../offline-notice'
import {scaleSize} from '../common'
import React from "react";
import View from '../view'
const {width} = Dimensions.get('window');
const isPad = width>600;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : scaleSize(56);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class Header extends React.Component {
    static Right = function(props){
        return (
            <TouchableOpacity onPress={props.onPress} style={props.style}>
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                    {props.icon&&<Image source={props.icon} style={props.iconStyle}/>}
                    {props.name&&<Text style={{color:'white',fontSize:scaleSize(12,30),marginLeft:scaleSize(6)}}>{props.name}</Text>}
                </View>
            </TouchableOpacity>
        )
    };
    render(){
        return (
            <React.Fragment>
            <ImageBackground source={!this.props.transparent&&require('./header_bg.png')}
                             style={[styles.header_background,
                                this.props.transparent&&{
                                    borderBottomColor:'#E6E6E6',
                                    borderBottomWidth: 1,
                                    backgroundColor:'white'
                                }, this.props.style]}
            >
                <View style={{flex:1,flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{position: 'absolute',left:scaleSize(10),zIndex:999}}>
                        {this.props.left&&this.props.left}
                        {this.props.navigate&&
                            <TouchableOpacity onPress={this.props.navigate}>
                                <View style={{width:scaleSize(50),alignItems:'center',}}>
                                    <Image source={this.props.transparent?require('./back_btn.png'):require('./back_btn_2.png')} style={{width: scaleSize(10)}} resizeMode='contain'/>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <View numberOfLines={1} style={[
                        {
                            flex:1,
                            fontSize:20,
                            alignItems:'center',
                            textAlign:'center',
                        },
                        this.props.transparent?{
                            color:'black',
                        }:{
                            color:'white',
                        },this.props.titleStyle]}>
                        {this.props.title}
                    </View>
                    <View style={{position: 'absolute',right:scaleSize(20),zIndex:999}}>
                        {this.props.right}
                    </View>
                </View>
            </ImageBackground>
            <OfflineNotice />
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    header_background:{
        zIndex:999,
        width:'100%',
        paddingTop:STATUSBAR_HEIGHT,
        ...ifIphoneX({
            height:APPBAR_HEIGHT+STATUSBAR_HEIGHT+22,
            paddingTop:STATUSBAR_HEIGHT+22,
        }, {
            height:APPBAR_HEIGHT+STATUSBAR_HEIGHT,
        }),

    }
});
