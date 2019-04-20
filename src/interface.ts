import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type MessageBoxType = "info" | "success" | "error" | "warning" | IconDefinition;
export type GetDrawerContainerFuc = () => HTMLElement;

export interface MessageBoxProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 是否显示
     */
    visible?: boolean;
    /**
     * 是否初始化动画
     */
    initTranstion?: boolean;
    /**
     * 否默认显示
     */
    defaultVisible?: boolean;
    /**
     * 对话框打开焦点元素选择器
     */
    initialFocus?: string;
    /**
     * 返回一个容器来装载抽屉
     * @description 默认为body内创建一个div作为容器
     */
    getContainer?: HTMLElement | GetDrawerContainerFuc;
    /**
     * 对话框包裹内容
     */
    children?: React.ReactNode;
    /**
     * 是否固定
     */
    fixed?: boolean;
    /**
     * 是否显示蒙层
     */
    showMask?: boolean;
    /**
     * 蒙层是否可关闭对话框
     */
    maskClose?: boolean;
    /**
     * 是否ESC关闭
     */
    closeOnPressEsc?: boolean;
    /**
     * 对话框可视改变事件
     */
    onChange?: (visible: boolean) => void;
    /**
     * 键盘按下事件
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    /**
     * 键盘事件
     * @description 可用于Esc关闭对话框
     */
    onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    /**
     * 对话框关闭动画结束
     */
    onUnmount?: Function;
    /**
     * 关闭事件
     */
    onClose?: Function;
    /**
     * 关闭ref
     */
    closeRef?: React.MutableRefObject<any>;
}

export interface AlertProps extends MessageBoxProps {
    /**
     * 标题
     */
    title: React.ReactNode;
    /**
     * 内容
     */
    message?: React.ReactNode;
    /**
     * 图标类型
     */
    type?: MessageBoxType;
    /**
     * 关闭事件
     */
    onClose?: Function;
    /**
     * 确定按钮文本
     */
    confirmText?: string;
    /**
     * 自定义页脚按钮
     */
    footer?: React.ReactNode;
}

export interface ConfirmProps extends MessageBoxProps {
    /**
     * 标题
     */
    title?: React.ReactNode;
    /**
     * 内容
     */
    message: React.ReactNode;
    /**
     * 确定文本
     */
    confirmText?: React.ReactNode;
    /**
     * 取消文本
     */
    cancelText?: React.ReactNode;
    /**
     * 关闭事件
     */
    onClose?: Function;
    /**
     * 确定事件
     */
    onConfirm?: () => Promise<any>;
    /**
     * 取消事件
     */
    onCancel?: Function;
}
