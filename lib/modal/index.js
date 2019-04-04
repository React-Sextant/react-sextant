import React from 'react'
import {View,Text,Image,ImageBackground,Modal,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import {scaleSize} from "../common";
const {width,height} = Dimensions.get('window');

class SelfModal extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={this.props.onClose}
                >
                    <TouchableWithoutFeedback >
                        <View style={{flex:1,backgroundColor:'black',opacity:0.7}} />
                    </TouchableWithoutFeedback>
                    <View pointerEvents="box-none" style={{width:width,height:height,backgroundColor:'transparent',position: 'absolute',top:0,left:0,justifyContent: 'center',alignItems: 'center'}}>
                        <View style={{width:scaleSize(0,747),height:scaleSize(0,603),backgroundColor:'white',borderRadius:scaleSize(4),justifyContent:'center',alignItems:'center'}}>
                            <View style={{marginBottom: scaleSize(0,30)}}>
                                {this.props.title}
                            </View>
                            <View>
                                {this.props.children}
                            </View>

                            <View style={{marginTop: scaleSize(0,100),flexDirection: 'row'}}>
                                <TouchableOpacity onPress={this.props.footer[0].onPress}>
                                    <ImageBackground source={this.props.footer[0].source||require('../../../../src/images/EreadingPad/button_gray.png')} style={{width:scaleSize(0,288),height:scaleSize(0,102),justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'white',fontSize:scaleSize(0,34),paddingBottom: scaleSize(3)}}>{this.props.footer[0].text}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.footer[1].onPress}>
                                    <ImageBackground source={this.props.footer[1].source||require('../../../../src/images/EreadingPad/button_orange.png')} style={{width:scaleSize(0,288),height:scaleSize(0,102),justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'white',fontSize:scaleSize(0,34),paddingBottom: scaleSize(3)}}>{this.props.footer[1].text}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>

                            {/************ close ************/}
                            <TouchableOpacity onPress={this.props.onClose} style={{position:'absolute',top:scaleSize(0,35),right:scaleSize(0,35),justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../../src/images/EreadingPad/icon_close.png')} style={{width:scaleSize(0,25),height:scaleSize(0,25),margin:scaleSize(0,10)}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </React.Fragment>
        )
    }
}

SelfModal.alert = function(title,text,footer){

    return new RootSiblings(
        <SelfModal
            title={title}
            visible={true}
            footer={footer}
        >
            {text}
        </SelfModal>
    );
};

export default SelfModal;
