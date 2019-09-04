import React, { useState } from "react";
import MessageBox from "../src/MessageBox";

const Content = React.memo(() => {
    return (
        <div style={{ background: "#fff", padding: "30px" }}>
            <h1>对话框标题</h1>
            <p>对话框内容</p>
        </div>
    );
});

export default function() {
    const [visible, setVisible] = useState(false);

    function toggle() {
        setVisible((v) => !v);
    }

    let closeFunc: Function;

    function getCloseFunc(close: Function) {
        closeFunc = close;
    }

    return (
        <div>
            <button onClick={toggle}>切换</button>
            <MessageBox visible={visible} onChange={(v) => setVisible(v)} getCloseFunc={getCloseFunc} onUnmount={(args: any) => console.log("onUnmount--------", args)}>
                <Content />
                <button onClick={() => closeFunc("123")}>测试</button>
            </MessageBox>
        </div>
    );
}
