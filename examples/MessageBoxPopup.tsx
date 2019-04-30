import React, { useState } from "react";
import { MessageBoxPopup } from "../src";
import "../src/assets/index";

export default function() {
    function alert() {
        var close = MessageBoxPopup.Alert({
            title: "提示",
            message: (
                <p>
                    这是提示 <a onClick={() => close()}>关闭</a>
                </p>
            ),
            onClose: () => {
                console.log("关闭了");
            },
        });
    }

    function confirm() {
        var close = MessageBoxPopup.Confirm({
            title: "请确认",
            message: (
                <p>
                    是否退出此系统? <a onClick={() => close()}>关闭</a>
                </p>
            ),
            onClose: () => {
                console.log("关闭了");
            },
            onCancel: () => {
                console.log("- onCancel");
            },
            onConfirm: () => {
                console.log("- onConfirm");
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1200);
                });
            },
        });
    }

    function prompt() {
        var close = MessageBoxPopup.Prompt({
            title: "请确认",
            message: (
                <p>
                    请输入水果2个字? <a onClick={() => close()}>关闭</a>
                </p>
            ),
            defaultValue: "蔬菜",
            valid: (val) => {
                return val === "水果" ? true : "只能输入水果2个字!";
            },
            onClose: () => {
                console.log("关闭了");
            },
            onCancel: () => {
                console.log("- onCancel");
            },
            onConfirm: (val) => {
                console.log(val, "- onConfirm");
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1200);
                });
            },
        });
    }

    function messgebox() {
        var close = MessageBoxPopup.Native({
            children: (
                <div style={{ background: "#fff" }}>
                    <p>一句话</p>
                    <p>二句话</p>
                    <p>三句话</p>
                    <a onClick={() => close()}>关闭</a>
                </div>
            ),
            onClose: () => {
                console.log("关闭了");
            },
        });
    }

    return (
        <div>
            <button onClick={alert}>弹出alert</button>
            <button onClick={confirm}>弹出confirm</button>
            <button onClick={prompt}>弹出prompt</button>
            <button onClick={messgebox}>弹出messgebox</button>
        </div>
    );
}
