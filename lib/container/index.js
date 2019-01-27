import React from 'react'
import {View,SafeAreaView} from 'react-native'

export default class extends React.Component {
    render(){
        return (
            <SafeAreaView style={[{flex:1},this.props.style]}>
                {this.props.children}
            </SafeAreaView>
        )
    }
}
