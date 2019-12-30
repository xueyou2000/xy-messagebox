import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import Alert from "./Alert";
import { ConfirmProps } from "./interface";
import { getLocal } from "./local";

export function Confirm(props: ConfirmProps) {
    const {
        prefixCls = "xy-messagebox-confirm",
        className,
        style,
        initialFocus = ".confirm-btn",
        title = getLocal().MessageBox.title,
        confirmText = getLocal().MessageBox.confirm,
        cancelText = getLocal().MessageBox.cancel,
        onConfirm,
        onCancel,
        ...rest
    } = props;
    const [loading, setLoading] = useState(false);
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
        if (onConfirm) {
            setLoading(true);
            onConfirm()
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
    }, []);

    function renderFooter() {
        return (
            <React.Fragment>
                <Button className="cancel-btn" type="text" onClick={closeHandle}>
                    {cancelText}
                </Button>
                <Button className="confirm-btn" loading={loading} onClick={confirmHandle} type="primary">
                    {confirmText}
                </Button>
            </React.Fragment>
        );
    }

    return <Alert {...rest} title={title} footer={renderFooter()} initialFocus={initialFocus} getCloseFunc={getCloseFunc} type={faQuestionCircle} className={classNames(prefixCls, className)} style={style} />;
}

export default React.memo(Confirm);
