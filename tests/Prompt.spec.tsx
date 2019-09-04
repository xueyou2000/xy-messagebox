import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { Prompt, MessageBoxLocal } from "../src";

describe("Prompt", () => {
    test("render", () => {
        const container = document.createElement("div");
        document.body.append(container);
        const wrapper = render(<Prompt message="消息" getContainer={container} />, { container });
        const title = container.querySelector(".prompt-title");
        expect(title.textContent).toBe(MessageBoxLocal.promptTitle);
        expect(container.querySelector(".confirm-btn").textContent).toBe(MessageBoxLocal.confirmText);
        expect(container.querySelector(".cancel-btn").textContent).toBe(MessageBoxLocal.cancelText);
    });

    test("default value", () => {
        const container = document.createElement("div");
        document.body.append(container);
        const wrapper = render(<Prompt message="消息" defaultValue="abc" getContainer={container} />, { container });

        const input = wrapper.container.querySelector("input");
        expect(input.classList.contains("prompt-input")).toBeTruthy();
    });

    test("default valid", () => {
        const container = document.createElement("div");
        document.body.append(container);
        const wrapper = render(<Prompt defaultValue="123" message="消息" placeholder="请输入" getContainer={container} />, { container });

        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "" } });
        const error = container.querySelector(".prompt-error");
        expect(error.textContent).toBe("输入不能为空");
    });

    test("customze valid", () => {
        const container = document.createElement("div");
        document.body.append(container);
        const wrapper = render(
            <Prompt
                defaultValue="123"
                message="消息"
                valid={(v) => {
                    if (v === "a") {
                        return true;
                    } else {
                        return "必须输入a";
                    }
                }}
                placeholder="请输入"
                getContainer={container}
            />,
            { container },
        );

        const input = wrapper.getByPlaceholderText("请输入");
        fireEvent.change(input, { target: { value: "" } });
        const error = container.querySelector(".prompt-error");
        expect(error.textContent).toBe("必须输入a");
        fireEvent.change(input, { target: { value: "a" } });
        expect(container.querySelector(".prompt-error")).toBeNull();
    });
});
