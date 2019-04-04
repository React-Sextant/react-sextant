import React, { PureComponent } from 'react';
import {View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

class NoticeBar extends PureComponent {
    render() {
        return (<View style={{paddingVertical:5,flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',backgroundColor:'#fffad8'}}>
            <View style={{paddingHorizontal:15,flexDirection: 'row',alignItems:'center'}}>
                {this.props.icon||<Icon name={'sound'} color={'#f5222d'} size={scaleSize(15)} style={{paddingRight: 5}}/>}
                {typeof this.props.children === 'string'?
                    <Text style={{color:'#f5222d',fontSize:15,flex:1}}>{this.props.children}</Text>:
                    this.props.children
                }
            </View>
        </View>)
    }
}

export default NoticeBar;
