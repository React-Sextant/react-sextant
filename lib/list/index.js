import React from 'react'
import {View,Text, Image, StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import {scaleSize} from "../../../../src/common";
const isPad = Dimensions.get('window').width>517;

export default class List extends React.Component {
    render(){
        try{
            this.props.children[this.props.children.length-1].props.style = {borderBottomWidth:0}
        }catch(err){

        }
        return (
            <View style={[{backgroundColor:'white',paddingHorizontal: scaleSize(14)},this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}
List.Item = function(props){
    let _arrow = null;
    switch(props.arrow){
        case 'horizontal':
            _arrow = require('./arrow.png');
            break;
    }
    return (
        <XTouchableOpacity onPress={props.onPress} disabled={!props.onPress||props.disabled} activeOpacity={0.7}>
            <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'white',borderBottomWidth:0.5,borderBottomColor:'#E6E6E6',paddingVertical: 15},props.style]}>
                {props.thumb&&<View style={[styles.thumb_node,props.thumbStyle]}>
                    {props.thumb}
                </View>}
                <View style={{flex:1,justifyContent:'center'}}>
                    {Array.isArray(props.children)?
                        props.children.map((a,i)=>{
                            return typeof a === 'string'?<Text style={styles.item_txt} numberOfLines={props.numberOfLines||2} key={i}>{a}</Text>:
                                <View key={i}>{a}</View>

                        }):typeof props.children === 'string'?<Text style={styles.item_txt} numberOfLines={props.numberOfLines||2}>{props.children}</Text>:
                            <View>{props.children}</View>
                    }
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:scaleSize(5)}}>
                    {typeof props.extra === 'object'?<View>{props.extra}</View>:<Text style={[styles.item_extra,props.extraStyle]} numberOfLines={2}>{props.extra}</Text>}
                    {_arrow&&<Image source={_arrow} style={{width:scaleSize(6),height:scaleSize(8),marginLeft:8}}/>}
                </View>
            </View>
        </XTouchableOpacity>
    )
};
List.Item.Brief = function(props){
    return (
        <Text style={[styles.brief_txt,props.style]}>{props.children}</Text>
    )
};

const styles = StyleSheet.create({
    item_txt:{
        fontSize:scaleSize(14,32),
        lineHeight:scaleSize(20,45),
        color:'#000000',
    },
    thumb_node:{
        marginRight:scaleSize(14,44),
    },
    item_extra:{
        fontSize:isPad?scaleSize(12):13,
        color:'#999999',
        maxWidth:scaleSize(200)
    },
    brief_txt:{
        fontSize:scaleSize(10,23),
        marginTop:scaleSize(0,14),
        color:'#999999',
    },
});
