import React, { PureComponent } from 'react';
import {  View,NetInfo,Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux'
import {setOffLine} from "../../../../redux/actions/offline";

class OfflineNotice extends PureComponent {
    componentDidMount() {
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if(this.props.offline.isConnected !== Boolean(connectionInfo.type!=='none')){
                this.props.setOffLine({isConnected:Boolean(connectionInfo.type!=='none')})
            }
        });
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.props.setOffLine({isConnected:isConnected})
    };

    render() {
        if (!this.props.offline.isConnected) {
            return <View style={{paddingVertical:5,paddingHorizontal:15,flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',backgroundColor:'#fffad8'}}>
                <View style={{flexDirection: 'row',alignItems:'center'}}>
                    <Icon name={'sound'} color={'#f5222d'} size={scaleSize(15)} style={{paddingRight: 5}}/>
                    <Text style={{color:'#f5222d',fontSize:15}}>没有互联网连接</Text>
                </View>
                {/*<Text style={{ color: '#a1a1a1' }} onPress={()=>this.props.setOffLine({isConnected:true})}>不再提示</Text>*/}
            </View>;
        }
        return null;
    }
}

const mapStateToProps = (state)=>{
    return {offline:state.offline}
};
const mapDispatchToProps = (dispatch) => {
    return {
        setOffLine : (params,callback) => {
            dispatch(setOffLine(params,callback))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OfflineNotice);
