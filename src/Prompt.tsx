import classNames from "classnames";
import React, { useRef, useState } from "react";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import MessageBox from "./MessageBox";
import { PromptProps } from "./interface";
import { MessageBoxLocal } from "./Locale";

/**
 * 默认验证
 * @param value 
 */
function DefaultValidate(value: string) {
    if (value === undefined || value === null || value === "") {
        return '输入不能为空';
    } else {
        return true;
    }
}

export function Prompt(props: PromptProps) {
    const { prefixCls = "xy-messagebox-prompt", className, style, initialFocus = ".confirm-btn", valid = DefaultValidate, title = MessageBoxLocal.promptTitle, confirmText = MessageBoxLocal.confirmText, placeholder, defaultValue, message, cancelText = MessageBoxLocal.cancelText, onConfirm, onCancel, ...rest } = props;
    const [loading, setLoading] = useState(false);
    const [validResult, setValidResult] = useState<boolean | string>(false);
    const valueRef = useRef(defaultValue);
    const classString = classNames(prefixCls, className, {
        'valid-fail': validResult,
    });
    let closeFunc: Function;
    function getCloseFunc(close: Function) {
        closeFunc = close;
        if (props.getCloseFunc) {
            props.getCloseFunc(close);
        }
    }

    function close() {
        if (closeFunc) {
            closeFunc();
        }
    }

    function closeHandle() {
        if (onCancel) {
            onCancel();
        }
        close();
    }

    function confirmHandle() {
        const result = valid(valueRef.current);
        setValidResult(result);
        if (typeof result === 'string') {
            return;
        }
        if (onConfirm) {
            setLoading(true);
            onConfirm(valueRef.current)
                .then(() => {
                    setLoading(false);
                    close();
                })
                .catch(() => {
                    setLoading(false);
                    close();
                })
        } else {
            close();
        }
    }

    function changeHandle(event: React.ChangeEvent<HTMLInputElement>) {
        valueRef.current = event.target.value;
        setValidResult(valid(valueRef.current));
    }

    return (
        <MessageBox {...rest} getCloseFunc={getCloseFunc} maskClose={false} initialFocus={initialFocus} >
            <div className={classString} style={style}>
                <p className="prompt-title">{title}</p>
                <div className="prompt-body">
                    <div className="prompt-message">{message}</div>
                    <input className="prompt-input" placeholder={placeholder} defaultValue={defaultValue || ''} onChange={changeHandle} />
                    {typeof validResult === 'string' && <p className="prompt-error">{validResult}</p>}
                </div>

                <div className="alert-footer">
                    <Button className="cancel-btn" type="text" onClick={closeHandle}>
                        {cancelText}
                    </Button>
                    <Button className="confirm-btn" loading={loading} onClick={confirmHandle} type="primary">
                        {confirmText}
                    </Button>
                </div>
            </div>
        </MessageBox>
    );
}

export default React.memo(Prompt);