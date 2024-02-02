# InputItem

text input文本输入框

## Import
```jsx harmony
import {InputItem} from '@react-sextant/react-sextant'
//or
import InputItem from '@react-sextant/react-sextant/lib/input-item'
```
## Example
Basic usage
```jsx harmony
<InputItem
    placeholder={"请输入手机号"}
    keyboardType='numbers-and-punctuation'
    value={this.state.mobile_phone}
    onChangeText={(text)=>{
        this.setState({mobile_phone:text})
    }}
/>
```
With custom icon on the left side
```jsx harmony
<InputItem>
    <Image />
</InputItem>
```
With extra custom view on the right side
```jsx harmony
<InputItem 
    extra={<View>{...}</View>}
/>
```
## API

 - TextInput [props...](https://reactnative.dev/docs/textinput)

| option | description | type | default |
|----|----|----|----|
|`*`clearButtonMode|Add android support,[see the detail in TextInput](https://facebook.github.io/react-native/docs/textinput#clearbuttonmode)|String|"never"|
|style|InputItem style|StyleSheet||
|inputStyle|TextInput style|StyleSheet||
|extra|node on the right side|React.Element||

