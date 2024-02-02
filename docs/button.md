# button

button按钮

## Import
```jsx harmony
import { Button } from '@react-sextant/react-sextant'
//or
import Button from '@react-sextant/react-sextant/lib/button'
```
## Example

Basic usage
```jsx harmony
<Button onPress={this.onPress} title={"button"} />
```
## API

 - TouchableOpacity [props...](https://reactnative.dev/docs/touchableopacity)

| props | description |
|----|----|
|type|enum{"primary","ghost"}, default is "primary"|
|color|backgroundColor when type is "primary" or border color when type is "ghost"|
|style|TouchableOpacity view style|
|titleStyle|title text style|
