import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimesCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useCallback } from "react";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import { AlertProps, MessageBoxType } from "./interface";
import { MessageBoxLocal } from "./Locale";
import MessageBox from "./MessageBox";

function getIcon(type: MessageBoxType): IconDefinition {
    let icon: IconDefinition;
    switch (type) {
        case "info":
            icon = faInfoCircle;
            break;
        case "success":
            icon = faCheckCircle;
            break;
        case "error":
            icon = faTimesCircle;
            break;
        case "warning":
            icon = faExclamationCircle;
            break;
        default:
            icon = type;
    }

    return icon;
}

const AlertBody = React.memo(({ type, title, message }: { type: MessageBoxType; title: React.ReactNode; message: React.ReactNode }) => {
    return (
        <div className="alert-body-wrapper">
            <div className="alert-body">
                <div className={classNames("alert-icon", { [`icon-type-${type}`]: typeof type === "string" })}>
                    <FontAwesomeIcon icon={getIcon(type)} />
                </div>
                <div className="alert-content">
                    <div className="alert-content__title">{title}</div>
                    <div className="alert-content__message">{message}</div>
                </div>
            </div>
        </div>
    );
});

export function Alert(props: AlertProps) {
    const { prefixCls = "xy-messagebox-alert", className, initialFocus = ".alert-btn", footer, confirmText = MessageBoxLocal.confirmText, style, title, message, children, type = "info", ...rest } = props;
    let closeFunc: Function;

    const getCloseFunc = useCallback((close: Function) => {
        closeFunc = close;
        if (props.getCloseFunc) {
            props.getCloseFunc(close);
        }
    }, []);

    const closeHandle = useCallback(() => {
        if (closeFunc) {
            closeFunc();
        }
    }, []);

    return (
        <MessageBox {...rest} getCloseFunc={getCloseFunc} maskClose={false} initialFocus={initialFocus} className={classNames(prefixCls, className)}>
            <div className="alert-content-wrapper" style={style}>
                <AlertBody type={type} title={title} message={message} />
                <div className="alert-footer">
                    {footer || (
                        <Button className="alert-btn" onClick={closeHandle} type="primary">
                            {confirmText}
                        </Button>
                    )}
                </div>
            </div>
        </MessageBox>
    );
}

export default React.memo(Alert);
