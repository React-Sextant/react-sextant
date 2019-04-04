import React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Image
} from 'react-native'
import {scaleSize} from '../common'

export default class extends React.Component {
    render(){
        return (
            <View>
                {this.props.children}
                {this.props.type === 'close' ?
                    <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.onPress} style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: scaleSize(20),
                        height: scaleSize(20)
                    }}>
                        <Image source={require('./close.png')}/>
                    </TouchableOpacity>:
                    <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.onPress} style={[{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: scaleSize(20),
                        height: scaleSize(20)
                    },this.props.style]}>
                        {this.props.node}
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
