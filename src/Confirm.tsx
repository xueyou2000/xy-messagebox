import classNames from "classnames";
import React, { useRef, useState } from "react";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import Alert from "./Alert";
import { ConfirmProps } from "./interface";
import { MessageBoxLocal } from "./Locale";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export function Confirm(props: ConfirmProps) {
    const { prefixCls = "xy-messagebox-confirm", className, style, initialFocus = ".confirm-btn", title = MessageBoxLocal.confirmTitle, confirmText = MessageBoxLocal.confirmText, cancelText = MessageBoxLocal.cancelText, onConfirm, onCancel, ...rest } = props;
    const closeRef = useRef<Function>();
    const [loading, setLoading] = useState(false);

    if (props.closeRef) {
        props.closeRef.current = closeRef.current;
    }

    function close() {
        if (closeRef.current) {
            closeRef.current();
        }
    }

    function closeHandle() {
        if (onCancel) {
            onCancel();
        }
        close();
    }

    function confirmHandle() {
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
                })
        } else {
            close();
        }
    }

    function renderFooter() {
        return (
            <React.Fragment>
                <Button type="text" onClick={closeHandle}>
                    {cancelText}
                </Button>
                <Button className="confirm-btn" loading={loading} onClick={confirmHandle} type="primary">
                    {confirmText}
                </Button>
            </React.Fragment>
        );
    }

    return (
        <Alert {...rest} title={title} footer={renderFooter()} initialFocus={initialFocus} closeRef={closeRef} type={faQuestionCircle} className={classNames(prefixCls, className)} style={style} />
    );
}

export default React.memo(Confirm);