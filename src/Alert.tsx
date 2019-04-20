import { faInfoCircle, faCheckCircle, faTimesCircle, faExclamationCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useRef } from "react";
import { AlertProps, MessageBoxType } from "./interface";
import MessageBox from "./MessageBox";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import { MessageBoxLocal } from "./Locale";

function getIcon(type: MessageBoxType) {
    let icon: IconDefinition;
    switch (type) {
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
            icon = faInfoCircle;
    }

    return icon;
}

export function Alert(props: AlertProps) {
    const { prefixCls = "xy-messagebox-alert", className, okBtnText = MessageBoxLocal.okBtnText, style, title, message, children, type, onClose, ...rest } = props;
    const closeRef = useRef<Function>();

    function closeHandle() {
        if (closeRef.current) {
            closeRef.current();
        }
    }

    return (
        <MessageBox {...rest} maskClose={false} initialFocus=".alert-btn" closeRef={closeRef} className={classNames(prefixCls, className)}>
            <div className="alert-content-wrapper" style={style}>
                <div className="alert-body-wrapper">
                    <div className="alert-body">
                        <div className="alert-icon">
                            <FontAwesomeIcon icon={getIcon(type)} />
                        </div>
                        <div className="alert-content">
                            <p className="alert-content__title">{title}</p>
                            <p className="alert-content__message">{message}</p>
                        </div>
                    </div>
                </div>
                <div className="alert-footer">
                    <Button className="alert-btn" onClick={closeHandle} type="primary">
                        {okBtnText}
                    </Button>
                </div>
            </div>
        </MessageBox>
    );
}

export default React.memo(Alert);
