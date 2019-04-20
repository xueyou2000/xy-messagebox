import { faInfoCircle, faCheckCircle, faTimesCircle, faExclamationCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useRef } from "react";
import { AlertProps, MessageBoxType } from "./interface";
import MessageBox from "./MessageBox";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import { MessageBoxLocal } from "./Locale";

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

export function Alert(props: AlertProps) {
    const { prefixCls = "xy-messagebox-alert", className, initialFocus = ".alert-btn", footer, confirmText = MessageBoxLocal.confirmText, style, title, message, children, type, ...rest } = props;
    const closeRef = useRef<Function>();
    if (props.closeRef) {
        props.closeRef.current = closeRef.current;
    }

    function closeHandle() {
        if (closeRef.current) {
            closeRef.current();
        }
    }

    return (
        <MessageBox {...rest} closeRef={closeRef} maskClose={false} initialFocus={initialFocus} className={classNames(prefixCls, className)}>
            <div className="alert-content-wrapper" style={style}>
                <div className="alert-body-wrapper">
                    <div className="alert-body">
                        <div className={classNames('alert-icon', { [`icon-type-${type}`]: typeof (type) === 'string' })}>
                            <FontAwesomeIcon icon={getIcon(type)} />
                        </div>
                        <div className="alert-content">
                            <p className="alert-content__title">{title}</p>
                            <p className="alert-content__message">{message}</p>
                        </div>
                    </div>
                </div>
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
