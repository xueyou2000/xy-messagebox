| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-messagebox.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-messagebox.svg?style=flat-square)

[![xy-messagebox](https://nodei.co/npm/xy-messagebox.png)](https://npmjs.org/package/xy-messagebox)

# xy-messagebox

消息框组件, 弹出提示框，确认框，输入框。

## 安装

```bash
# yarn
yarn add xy-messagebox xy-button utils-hooks classnames @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { MessageBox, Alert, Confirm, Prompt, MessageBoxLocal, MessageBoxPopup } from "xy-messagebox";
ReactDOM.render(<Alert title="警告" message="确定退出系统吗?" />, container);
```

js 调用

```tsx
var close = MessageBoxPopup.Alert({
    title: "提示",
    message: (
        <p>
            这是提示 <a onClick={() => close()}>关闭</a>
        </p>
    ),
    onClose: () => {
        console.log("关闭了");
    },
});
```

## API

### MessageBox

| 属性            | 说明                     | 类型                                                 | 默认值 |
| --------------- | ------------------------ | ---------------------------------------------------- | ------ |
| visible         | 是否显示                 | boolean                                              | false  |
| defaultVisible  | 否默认显示               | boolean                                              | false  |
| initialFocus    | 对话框打开焦点元素选择器 | boolean                                              | 无     |
| getContainer    | 返回一个容器来装载抽屉   | HTMLElement/() => HTMLElement                        | 无     |
| children        | 对话框内容               | React.ReactNode                                      | 无     |
| fixed           | 是否固定                 | boolean                                              | true   |
| showMask        | 是否显示蒙层             | boolean                                              | true   |
| maskClose       | 蒙层是否可关闭对话框     | boolean                                              | true   |
| closeOnPressEsc | 是否 ESC 关闭            | boolean                                              | true   |
| onChange        | 对话框可视改变事件       | (visible: boolean) => void                           | 无     |
| onKeyDown       | 键盘按下事件             | (event: React.KeyboardEvent<HTMLDivElement>) => void | 无     |
| onUnmount       | 对话框关闭动画结束       | Function                                             | 无     |
| onClose         | 关闭事件                 | Function                                             | 无     |
| getCloseFunc    | 获取关闭函数             | (close: Function) => void                            | 无     |

### Alert

| 属性        | 说明           | 类型                                              | 默认值 |
| ----------- | -------------- | ------------------------------------------------- | ------ |
| title       | 标题           | React.ReactNode                                   | 无     |
| message     | 内容           | React.ReactNode                                   | 无     |
| type        | 图标类型       | "info"/"success"/"error"/"warning"/IconDefinition | "info" |
| confirmText | 确定按钮文本   | string                                            | 无     |
| footer      | 自定义页脚按钮 | React.ReactNode                                   | 无     |

### Confirm

| 属性        | 说明         | 类型               | 默认值 |
| ----------- | ------------ | ------------------ | ------ |
| title       | 标题         | React.ReactNode    | 无     |
| message     | 内容         | React.ReactNode    | 无     |
| confirmText | 确定按钮文本 | React.ReactNode    | 无     |
| cancelText  | 取消文本     | React.ReactNode    | 无     |
| onConfirm   | 确定事件     | () => Promise<any> | 无     |
| onCancel    | 取消事件     | Function           | 无     |

### Prompt

| 属性         | 说明                                                    | 类型                           | 默认值 |
| ------------ | ------------------------------------------------------- | ------------------------------ | ------ |
| title        | 标题                                                    | React.ReactNode                | 无     |
| message      | 内容                                                    | React.ReactNode                | 无     |
| confirmText  | 确定按钮文本                                            | React.ReactNode                | 无     |
| cancelText   | 取消文本                                                | React.ReactNode                | 无     |
| onConfirm    | 确定事件                                                | (value: strin) => Promise<any> | 无     |
| onCancel     | 取消事件                                                | Function                       | 无     |
| defaultValue | 默认内容                                                | string                         | 无     |
| placeholder  | 占位符文本                                              | string                         | 无     |
| valid        | 验证函数, 验证成功返回 true, 严重失败返回失败原因字符串 | (val: string) => boolean       | string | 无 |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-messagebox is released under the MIT license.
