import React, { useState } from "react";
import { Alert } from "../src";
import { Button } from "xy-button";
import "xy-button/assets/index.css";

export default function() {
    const [visible, setVisible] = useState(false);

    function toggle() {
        setVisible((v) => !v);
    }

    return (
        <div>
            <h1>简单演示</h1>
            <Button onClick={toggle}>切换</Button>
            <Alert title="提示" message="进入零大陆的第15天..." visible={visible} onChange={(v) => setVisible(v)} />
        </div>
    );
}
