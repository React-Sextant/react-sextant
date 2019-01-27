import React from 'react'
import {
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native'
import {scaleSize} from '../common'

export default class extends React.Component {
    render(){
        let source=require('./bg.png');
        switch(this.props.type){
            case 'red':
                source=require('./bg.png');
                break;
            case 'primary':
                source=require('./primary.png');
                break;
        }
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress} style={[{marginTop:scaleSize(24),width:'100%'},this.props.style]}>
                <ImageBackground source={source} style={[{width:'100%',height:scaleSize(55),justifyContent:'center',alignItems:'center'},this.props.style]} imageStyle={{width:'100%',height:'100%'}} resizeMode="contain">
                    <Text style={{color:'white',fontSize:scaleSize(19),marginTop: scaleSize(-5)}}>{this.props.children}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}
