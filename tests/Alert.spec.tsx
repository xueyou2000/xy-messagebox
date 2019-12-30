import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "../src";
import Zh from "../src/local/zh";

describe("Alert", () => {
    test("render", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(<Alert title="标题" message="消息" getContainer={container} />, { container });
        const title = wrapper.getByText("标题");
        const message = wrapper.getByText("消息");
        expect(container.querySelector(".alert-icon").classList.contains("icon-type-info")).toBeTruthy();
        expect(title.classList.contains("alert-content__title")).toBeTruthy();
        expect(message.classList.contains("alert-content__message")).toBeTruthy();

        expect(container.querySelector(".alert-btn").textContent).toBe(Zh.MessageBox.confirm);
    });

    test("icon type", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(<Alert title="标题" type="error" getContainer={container} />, { container });
        expect(container.querySelector(".alert-icon").classList.contains("icon-type-error")).toBeTruthy();

        wrapper.rerender(<Alert title="标题" type="success" getContainer={container} />);
        expect(container.querySelector(".alert-icon").classList.contains("icon-type-success")).toBeTruthy();

        wrapper.rerender(<Alert title="标题" type="warning" getContainer={container} />);
        expect(container.querySelector(".alert-icon").classList.contains("icon-type-warning")).toBeTruthy();

        wrapper.rerender(<Alert title="标题" type={faAddressBook} getContainer={container} />);
    });

    test("confirmText", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(<Alert title="标题" confirmText="按钮" getContainer={container} />, { container });
        const btn = wrapper.getByText("按钮").parentElement;
        expect(btn.classList.contains("alert-btn")).toBeTruthy();
    });

    test("footer", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(<Alert title="标题" footer={<a>自定义页脚</a>} getContainer={container} />, { container });
        const a = wrapper.getByText("自定义页脚");
        expect(a).not.toBeNull();
    });
});
