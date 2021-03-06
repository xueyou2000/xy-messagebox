import classNames from "classnames";
import React, { useRef, useState, useCallback } from "react";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import MessageBox from "./MessageBox";
import { PromptProps } from "./interface";
import { getLocal } from "./local";

/**
 * 默认验证
 * @param value
 */
function DefaultValidate(value: string) {
    if (value === undefined || value === null || value === "") {
        return getLocal().MessageBox.promptError;
    } else {
        return true;
    }
}

export function Prompt(props: PromptProps) {
    const {
        prefixCls = "xy-messagebox-prompt",
        className,
        style,
        initialFocus = ".confirm-btn",
        valid = DefaultValidate,
        title = getLocal().MessageBox.title,
        confirmText = getLocal().MessageBox.confirm,
        placeholder,
        defaultValue,
        message,
        cancelText = getLocal().MessageBox.cancel,
        onConfirm,
        onCancel,
        ...rest
    } = props;
    const [loading, setLoading] = useState(false);
    const [validResult, setValidResult] = useState<boolean | string>(false);
    const valueRef = useRef(defaultValue);
    const classString = classNames(prefixCls, className, {
        "valid-fail": validResult,
    });
    let closeFunc: Function;
    const getCloseFunc = useCallback((close: Function) => {
        closeFunc = close;
        if (props.getCloseFunc) {
            props.getCloseFunc(close);
        }
    }, []);

    const close = useCallback(() => {
        if (closeFunc) {
            closeFunc();
        }
    }, []);

    const closeHandle = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        close();
    }, []);

    const confirmHandle = useCallback(() => {
        const result = valid(valueRef.current);
        setValidResult(result);
        if (typeof result === "string") {
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
                });
        } else {
            close();
        }
    }, [valueRef.current]);

    const changeHandle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        valueRef.current = event.target.value;
        setValidResult(valid(valueRef.current));
    }, []);

    return (
        <MessageBox {...rest} getCloseFunc={getCloseFunc} maskClose={false} initialFocus={initialFocus}>
            <div className={classString} style={style}>
                <p className="prompt-title">{title}</p>
                <div className="prompt-body">
                    <div className="prompt-message">{message}</div>
                    <input className="prompt-input" placeholder={placeholder} defaultValue={defaultValue || ""} onChange={changeHandle} />
                    {typeof validResult === "string" && <p className="prompt-error">{validResult}</p>}
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
