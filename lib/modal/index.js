import React from 'react'
import {View,Text,Image,ImageBackground,Modal,Dimensions,TouchableOpacity} from 'react-native'
import RootView from '../root-view'
import {scaleSize} from "../common";
const {width,height} = Dimensions.get('window');

class SelfModal extends React.Component{

    static defaultProps = {
        onClose:Function(),
        visible:true,
        footer:[]
    };

    state={
        visible:this.props.visible
    };

    onClose=()=>{
        this.props.footer[0]&&this.props.footer[0].onPress()
    };

    submit=()=>{
        this.props.footer[1]&&this.props.footer[1].onPress()
    };

    render(){
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this.onClose}
            >
                <View style={{flex:1,backgroundColor:'black',opacity:0.7}} />
                <View style={{width:width,height:height,backgroundColor:'transparent',position: 'absolute',top:0,left:0,justifyContent: 'center',alignItems: 'center'}}>
                    <ImageBackground source={require('./hat.png')} style={{minWidth:scaleSize(250,700),width:'50%',height:scaleSize(62),zIndex:4}} imageStyle={{width:'100%',height:'100%'}} resizeMode="stretch">
                        <View style={{flex:1,marginTop:scaleSize(-15),flexDirection:'row',alignItems:'center',position:'relative'}}>
                            <Text style={{flex:1,color:'#FFFFFF',fontSize:scaleSize(16),textAlign:'center',}}>
                                温馨提示
                            </Text>
                            <TouchableOpacity  style={{position:'absolute',right:0}} onPress={this.onClose}>
                                <View style={{backgroundColor:'transparent',width:scaleSize(40),height:scaleSize(40),justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('./close.png')} resizeMode={'contain'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={{width:scaleSize(216,604),height:scaleSize(220,520),marginTop:scaleSize(-45),backgroundColor:'white',borderRadius:scaleSize(4),justifyContent:'center',alignItems:'center',zIndex:3}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:scaleSize(45),}}>
                            <View style={{marginBottom: scaleSize(15)}}>
                                {typeof this.props.title==='string'?
                                    <Text style={{color:'#000000',fontSize:scaleSize(18,40),fontWeight: '500'}}>
                                        {this.props.title}
                                    </Text>
                                    :
                                    this.props.title
                                }
                            </View>
                            <View>

                                {typeof this.props.children==='string'?
                                    <Text style={{color:'#808080',fontSize:scaleSize(13,28)}}>
                                        {this.props.children}
                                    </Text>
                                    :
                                    this.props.children
                                }

                            </View>
                        </View>

                        <View style={{flexDirection: 'row',marginBottom:scaleSize(10)}}>
                            <TouchableOpacity onPress={this.onClose} style={{flex:1,height:scaleSize(45)}}>
                                <ImageBackground source={require('./button_gray.png')} style={{width:'100%',height:scaleSize(40,90),justifyContent:'center',alignItems:'center'}} imageStyle={{width:'100%',height:'100%'}} resizeMode="contain">
                                    <Text style={{color:'white',fontSize:scaleSize(14),paddingBottom: scaleSize(3)}}>取消</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.submit} style={{flex:1,height:scaleSize(45)}}>
                                <ImageBackground source={require('./button_red.png')} style={{width:'100%',height:scaleSize(40,90),justifyContent:'center',alignItems:'center'}} imageStyle={{width:'100%',height:'100%'}} resizeMode="contain">
                                    <Text style={{color:'white',fontSize:scaleSize(14),paddingBottom: scaleSize(3)}}>确定</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
SelfModal.alert = function(title,node,footer){

    return RootView.setView(<SelfModal
        title={title}
        visible={true}
        footer={footer}
    >
        {node}
    </SelfModal>)
};

SelfModal.hide = function(){
    RootView.hide()
};

export default SelfModal;
