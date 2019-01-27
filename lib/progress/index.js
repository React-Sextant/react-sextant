import React from 'react'
import {ProgressBarAndroid,ProgressViewIOS,Platform} from 'react-native'

export default class extends React.Component {
    render(){
        return (
            <React.Fragment>
                {Platform.OS === "ios"?
                    <ProgressViewIOS style={[{transform: [{ scaleX: 1.0 }, { scaleY: 3 }]},this.props.styles]} {...this.props} progressTintColor={this.props.color}/> :
                    <ProgressBarAndroid styleAttr={'Horizontal'} indeterminate={false} {...this.props}/>
                }
            </React.Fragment>
        )
    }
}
