import React, { useState } from "react";
import { Alert } from "../src";
import "../src/assets/index";
import { Button } from "xy-button";
import "xy-button/assets/index.css";

export default function() {
    const [visible, setVisible] = useState(false);

    function toggle() {
        setVisible((v) => !v);
    }

    return (
        <div>
            <Button onClick={toggle}>切换</Button>
            <Alert title="提示" type="warning" message="进入零大陆的第15天..." visible={visible} onChange={(v) => setVisible(v)} />
        </div>
    );
}
