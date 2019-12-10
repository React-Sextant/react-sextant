import {View,StyleSheet, TextInput,Image,TouchableOpacity,Platform} from "react-native";
import React from "react";

export default class extends React.PureComponent{
    static defaultProps = {
        clearButtonMode:"never",
        maxLength:50,
        onFocus:Function,
        onBlur:Function,
        onChangeText:Function,
        inputStyle:{}
    };

    constructor(props){
        super(props);
        this.state={
            visible:false
        };
        this.value = this.props.value||this.props.defaultValue
    }

    componentWillMount() {
        if(!!this.value&&this.props.clearButtonMode==="unless-editing"){
            this.setState({visible:true})
        }
    }

    clear=()=>{
        this._root.clear();
        this.props.onChangeText('');
        this.setState({visible:false})
    };

    onFocus=()=>{
        if(!!this.value&&(this.props.clearButtonMode==="while-editing"||this.props.clearButtonMode==="always")){
            if(!this.state.visible){
                this.setState({visible:true})
            }
        }else {
            if(this.state.visible){
                this.setState({visible:false})
            }
        }

        return this.props.onFocus()
    };

    onBlur=()=>{
        if(!!this.value&&(this.props.clearButtonMode==="unless-editing"||this.props.clearButtonMode==="always")){
            if(!this.state.visible){
                this.setState({visible:true})
            }
        }else {
            if(this.state.visible){
                this.setState({visible:false})
            }
        }

        return this.props.onBlur()
    };

    onChangeText= (text)=>{
        if(typeof this.props.value === "string"){
            this.value = this.props.value?text:"";
        }else {
            this.value = text;
        }

        this.props.onChangeText(text);

        if(!!this.value&&(this.props.clearButtonMode==="always"||this.props.clearButtonMode==="while-editing")){
            if(!this.state.visible){
                this.setState({visible:true})
            }
        }else if(!this.value){
            if(this.state.visible){
                this.setState({visible:false})
            }
        }
    };

    render(){
        return (
            <View style={[styles.input_box,{...this.props.style}]}>
                <View>
                    {this.props.children}
                </View>
                <View style={{flex:1,flexDirection: 'row',alignItems: "center"}}>
                    <TextInput
                        {...{...this.props,children:null}}
                        ref={c => {
                            this._root = c
                        }}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onChangeText={this.onChangeText}
                        style={[styles.input,this.props.inputStyle]}
                    />
                    {Boolean(Platform.OS==='android'&&this.state.visible)&&<TouchableOpacity onPress={this.clear} style={{backgroundColor: 'transparent',zIndex:999,marginLeft:-30}}>
                        <Image source={require('./close.png')} resizeMode={'contain'} style={{width:15}}/>
                    </TouchableOpacity>}
                </View>
                <View>
                    {this.props.extra}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    input_box: {
        width:'100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'white',
        justifyContent:'space-between'
    },
    input:{
        height: 40,
        width:'100%',
        borderColor: '#EFEFEF',
        fontSize:14,
    }
});
