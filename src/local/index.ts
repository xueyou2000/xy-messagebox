import LocalZh from "./zh";

/**
 * 获取消息对象
 * @param key
 */
export function getLocal(): typeof LocalZh {
    return (window as any).GlobalComponentLocal || LocalZh;
}
