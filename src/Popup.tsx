import React from 'react';
import ReactDOM from "react-dom";
import AlertComponent from "./Alert";
import ConfirmComponent from "./Confirm";
import { AlertProps, ConfirmProps, MessageBoxProps, PromptProps } from './interface';
import MessageBoxComponent from "./MessageBox";
import PromptComponent from "./Prompt";

function popup(Compoment: React.FunctionComponent<MessageBoxProps>, config: MessageBoxProps) {
    let closeFunc: Function;
    const div = document.createElement("div");
    document.body.appendChild(div);

    ReactDOM.render(
        <Compoment
            {...config}
            defaultVisible={true}
            getContainer={div}
            getCloseFunc={(close) => {
                closeFunc = close;
            }}
            onUnmount={() => {
                ReactDOM.unmountComponentAtNode(div);
                div.parentNode.removeChild(div);
            }}
        />,
        div,
    );

    return () => {
        if (closeFunc) {
            closeFunc();
        }
    };
}

class MessageBoxPopup {

    /**
     * 弹出Alert对话框
     * @param config 配置
     * @returns 返回关闭对话框的函数
     */
    static Alert(config: AlertProps) {
        return popup(AlertComponent, config);
    }

    /**
     * 弹出Confirm对话框
     * @param config 配置
     * @returns 返回关闭对话框的函数
     */
    static Confirm(config: ConfirmProps) {
        return popup(ConfirmComponent, config);
    }

    /**
     * 弹出Prompt对话框
     * @param config 配置
     * @returns 返回关闭对话框的函数
     */
    static Prompt(config: PromptProps) {
        return popup(PromptComponent, config);
    }

    /**
     * 弹出自定义对话框
     * @param config 配置
     * @returns 返回关闭对话框的函数
     */
    static Native(config: MessageBoxProps) {
        return popup(MessageBoxComponent, config);
    }

}


export default MessageBoxPopup;