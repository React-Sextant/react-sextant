import React from 'react'
import {View,Text} from 'react-native'

function TextView(props){
    return typeof props.children === 'string'?<Text {...props}>{props.children}</Text>:<View {...props}>{props.children}</View>
}

export default TextView
