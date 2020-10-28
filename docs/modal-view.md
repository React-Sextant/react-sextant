# ModalView

modal view模拟模态框

使用场景：替换原生的`Modal`组件，目的是允许在`Modal`中可继续弹出`Modal`，图层仅有`zIndex`决定。

## Import
```jsx harmony
import {ModalView} from 'react-sextant'
//or
import ModalView from 'react-sextant/lib/modal-view'
```
## Example
Basic usage
```jsx harmony
<ModalView animationType="slide" visible={this.state.visible} onMaskPress={()=>{this.setState({visible:false})}}>
    <View style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height,backgroundColor:'yellow'}}/>
</ModalView>
```
Custom animation
```jsx harmony
export default class extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible:true
        };
        this.animatedValue = new Animated.Value(0);
    }
    animate=({width, height})=>{
      return {
        transform: [
            {
                translateY: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height,0]
                })
            }
        ]}
    };
    
    render(){
        return (
            <ModalView animate={this.animate} visible={this.state.visible}>
                <View style={{width:150,height:150,backgroundColor:'yellow'}}/>
            </ModalView>
        )
    }
}
```
Simulate `Action-Sheet`
```jsx harmony
<ModalView style={{justifyContent:'flex-end'}} animationType="slide" visible={this.state.visible}>
    <View style={{width:Dimensions.get("window").width,height:200,backgroundColor:'yellow'}}/>
</ModalView>
```

With Modal `transparent={true}` is best
```jsx harmony
<Modal transparent visible={this.state.visible}>
    <ModalView visible>
        ...
    </ModalView>
</Modal>
```

## API

 - ModalView [props...](https://reactnative.dev/docs/modal)

| option | description | type | default |
|----|----|----|----|
|style|Positioning of the `props.children` in the `ModalView`|StyleSheet||
|background|Expansion of `transparent`|StyleSheet|`{backgroundColor: "black", opacity:0.4}`|
|animationType|The animationType prop controls how the modal animates.|enum('none', 'slide', 'fade', 'spring', 'vibrate')|'none'|
|animate|Expansion of `animationType`, A void to custom animation|void||
|onRequestClose|Same as Modal's `onRequestClose`|void|return false|
|onMaskPress|Handle mask's onPress|void||
