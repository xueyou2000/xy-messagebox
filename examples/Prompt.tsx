import React, { useState } from "react";
import { Prompt } from "../src";
import { Button } from "xy-button";
import "xy-button/assets/index.css";

export default function() {
    const [visible, setVisible] = useState(false);

    function toggle() {
        setVisible((v) => !v);
    }

    function confirm() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1200);
        });
    }

    return (
        <div>
            <Button onClick={toggle}>切换</Button>
            <Prompt title="请确认" message="是否退出此系统?" onClose={() => console.log("- onClose")} onCancel={() => console.log("- onCancel")} onConfirm={confirm} visible={visible} onChange={(v) => setVisible(v)} />
        </div>
    );
}
