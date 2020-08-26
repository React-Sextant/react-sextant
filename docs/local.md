# Local

local 本地化

## redux实现

 - 组件
 
   ```jsx harmony
   import React from 'react';
   import {Text, View, Button} from 'react-native';
   import {connect} from 'react-redux';
   class A extends React.Component {
       render(){
           return (
               <View>
                   <Text>{this.props.local.LOCALTION}</Text>
                   <Button onPress={this.props.changeLocal("zh_CN")}/>       
               </View>
           )
       }
   }
   
   const mapStateToProps = (state) => ({
       local: state.local,
   });
   const mapDispatchToProps = (dispatch) => {
       return {
           changeLocal: (type)=>{
               dispatch({type:type})
           }
       }
   };
   
   export default connect(mapStateToProps,mapDispatchToProps)(A)
   ```
 
   
 - reducers/local.js
 
   ```javascript
   const strings = {
       zh_CN:{
           LOCATION:"CHINA!"
       },
       us:{
           LOCATION:"USA"
       }
   };
   
   export default function local(state = strings["us"], action) {
       switch (action.type) {
           case "zh_CN":
               return strings["zh_CN"];
           case "us":
               return strings["us"];
           default:
               return state
       }
   }
   ```
