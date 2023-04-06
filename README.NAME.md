## 命名规范

尽量使用有意义单词或组合。
`部分内容前缀需加 jw （'嘉文'拼音首字母）,如：样式名称、组件文件名称、组件name 等`


### 组件文件（文件夹）名称: 组件文件名称小写（两个单词之间使用中横线连接），需加前缀jw-，如下：

 ```
 ├── jw-button
 │     └── jw-button.vue  
 ├── jw-date-picker
	    └── jw-date-picker.vue 
 ```


### 组件name名称：大驼峰命名，需加前缀Jw。

注意：在引入选项对象时统一使用小驼峰命名，组件注册时，组件名使用小驼峰命名。在view中组件名将驼峰转换为中横线分隔（jw-button）命名。

``` js
//组件命名
export default {
  name: 'JwButton'
}
```

``` js
//组件引入（vue2可以省略后缀.vue）
import jwButton from '../jw-button/jw-button.vue'

```

``` html
<!--页面使用-->
<jw-button>按钮</jw-button>
```


### 组件属性props名称：小驼峰命名。

组件中的prop属性定义以及在模板语言使用时，使用小驼峰规则命名，当父组件在view（html）传参时，需要将驼峰命名转换为中横线分隔方式命名方式使用。

```js
//props定义
props:{
	type:{
		type:String,
		default:'primary'
	},
	nativeType:{
	   type: String,
	   default: 'button'
	}
}
```

```html
<!--父组件（页面）使用-->
<jw-button type="danger" native-type="button">按钮</jw-button>
```


### 样式命名：需加前缀jw-

- 文件命名

不得包含汉字空格和特殊字符，全部采用小写方式，多个单词组成时，以中划线分割，尽量保持与组件名一致

- 样式命名

采用相应样式效果、功能描述的单词或缩写，不得包含汉字空格和特殊字符。

（1）id命名：小驼峰式命名法。建议尽量避免使用id作为样式控制。

（2）class命名：小写英文 & 数字 & - & __ 组合，前两个单词之间使用中横线连接，第三个单词开始使用双下划线拼接。

（3）常规命名：命名中除众所周知的缩写外，尽量不采用缩写。

scss/less书写规范：

（1）位置属性(position, top, right, z-index, display, float等)；  

（2）大小(width, height, padding, margin)；  

（3）文字系列(font, line-height, letter-spacing, color,  text-align等)；  

（4）背景(background, border等)；  

（5）其他(animation, transition等)。

建议遵循 布局定位属性-->自身属性-->文本属性-->其他属性，非特殊场景尽量少使用!important。

``` css
#jwHeader{
	
}
.jw-button{
	
}
.jw-button__wrap{
	
}
```