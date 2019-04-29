import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { ENTERED, ENTERING, EXITED, useControll, usePortal, useTranstion, useMount } from "utils-hooks";
import { MessageBoxProps } from "./interface";

export function MessageBox(props: MessageBoxProps) {
    const { prefixCls = "xy-messagebox", className, style, initialFocus, getContainer, fixed = true, showMask = true, maskClose = true, onChange, children, onUnmount, onClose, closeOnPressEsc = true, onKeyDown, getCloseFunc } = props;
    const [renderPortal, container] = usePortal("", getContainer);
    const [visible, setVisible, isControll] = useControll(props, "visible", "defaultVisible");
    const [ref, state] = useTranstion(visible);

    const opening = state.indexOf("en") !== -1;
    const focusElementRef = useRef<HTMLElement>();
    const firstFlagRef = useRef(visible);
    const classString = classNames(prefixCls, className, `${prefixCls}-state-${state}`, {
        [`${prefixCls}-open`]: opening,
        "use-container": !fixed
    });

    function handleChange(_open: boolean) {
        if (!isControll) {
            setVisible(_open);
        }
        if (onChange) {
            onChange(_open);
        }
    }

    function handleMaskClick() {
        if (maskClose) {
            handleChange(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Esc" || (e.keyCode === 27 && closeOnPressEsc)) {
            handleChange(false);
        }

        if (onKeyDown) {
            onKeyDown(e);
        }
    }

    if (getCloseFunc) {
        getCloseFunc(() => handleChange(false));
    }

    useEffect(() => {
        const scrollContainer = fixed ? document.body : container;
        if (scrollContainer) {
            if (opening) {
                scrollContainer.style.overflow = "hidden";
            } else {
                scrollContainer.style.overflow = "auto";
            }
        }

        if (state === ENTERING) {
            focusElementRef.current = document.activeElement as HTMLElement;
        } else if (state === ENTERED && initialFocus) {
            firstFlagRef.current = true;
            const initialFocusEle = (ref.current as HTMLElement).querySelector(initialFocus) as HTMLElement;
            if (initialFocusEle) {
                initialFocusEle.focus();
            }
        }
        // 关闭动画完毕触发onUnmount事件
        if (state === EXITED) {
            if (focusElementRef.current) {
                focusElementRef.current.focus();
            }
            // Tips: 排除第一次可视为false的时, 不触发这些事件
            if (firstFlagRef.current === true) {
                if (onUnmount) {
                    onUnmount();
                }
                if (onClose) {
                    onClose();
                }
            }
        }
    }, [state]);

    return renderPortal(
        <div className={classString} style={style}>
            {showMask && <div className={`${prefixCls}-mask`} onClick={handleMaskClick} />}
            <div className={`${prefixCls}-container-wrapper`}>
                <div className={`${prefixCls}-content`} ref={ref} tabIndex={0} onKeyDown={handleKeyDown}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default React.memo(MessageBox);
