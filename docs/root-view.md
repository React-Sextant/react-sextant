# RootView

root view根视图
顾名思义从根组件中插入视图，不受当前页面影响，效果与`Modal`,`Toast`相似。
可以只添加一层，也可以**叠加**添加视图

## Import
```jsx harmony
import {RootView} from 'react-sextant'
//or
import RootView from 'react-sextant/lib/root-view'
```
## Example
Basic usage
```jsx harmony
RootView.setView(
    <View style={{flex:1,backgroundColor:'#000000',opacity:0.5}}>
        <Text style={{color:'#FFFFFF'}}>Modal Text</Text>
    </View>
)
```

Add stack view in root
```jsx harmony
const key = RootView.add(<View />);
RootView.remove(key);

const key2 = RootView.add(<View />)
```
## API

| void | description |
|----|----|
|addView(Element)|Add root view, will reset the stacked|
|hide()|Hidden root view and clear the stacked|
|add()|Add stack view in root, return key which is the stack's index|
|remove(key)|Remove stack's specified index view|
