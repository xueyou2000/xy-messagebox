import React, { useState } from "react";
import MessageBox from "../src/MessageBox";

export default function() {
    const [visible, setVisible] = useState(false);

    function toggle() {
        setVisible((v) => !v);
    }

    return (
        <div>
            <h1>简单演示</h1>
            <button onClick={toggle}>切换</button>
            <MessageBox visible={visible} onChange={(v) => setVisible(v)}>
                <h1>对话框标题</h1>
                <p>对话框内容</p>
            </MessageBox>
        </div>
    );
}
