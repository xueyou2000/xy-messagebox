import React, { useState, useRef } from "react";
import { Alert } from "../src";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import './index.scss';

export default function () {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    function toggle() {
        setVisible((v) => !v);
    }

    return (
        <div>
            <h1>在指定容器中</h1>
            <Button onClick={toggle}>切换</Button>

            <div className="drawer-container" ref={ref} />

            <Alert title="提示" fixed={false} type="warning" message="进入零大陆的第15天..." getContainer={() => ref.current} visible={visible} onChange={(v) => setVisible(v)} />
        </div>
    );
}
