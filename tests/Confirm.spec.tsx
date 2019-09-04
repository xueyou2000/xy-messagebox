import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { Confirm, MessageBoxLocal } from "../src";

describe("Confirm", () => {
    test("render", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(<Confirm message="消息" getContainer={container} />, { container });
        const message = wrapper.getByText("消息");
        expect(message.classList.contains("alert-content__message")).toBeTruthy();

        expect(container.querySelector(".confirm-btn").textContent).toBe(MessageBoxLocal.confirmText);
        expect(container.querySelector(".cancel-btn").textContent).toBe(MessageBoxLocal.cancelText);
        expect(container.querySelector(".alert-content__title").textContent).toBe(MessageBoxLocal.confirmTitle);
    });

    test("constomze btn text", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(<Confirm message="消息" confirmText="a" cancelText="b" getContainer={container} />, { container });

        expect(container.querySelector(".confirm-btn").textContent).toBe("a");
        expect(container.querySelector(".cancel-btn").textContent).toBe("b");
    });

    // test("onConfirm", (done) => {
    //     const container = document.createElement("div");
    //     document.body.append(container);
    //     const onConfirm = jest.fn(() => {
    //         return Promise.resolve();
    //     });
    //     const wrapper = render(<Confirm message="消息" onConfirm={onConfirm} confirmText="a" cancelText="b" getContainer={container} />, { container });

    //     fireEvent.click(container.querySelector('.confirm-btn'));
    //     expect(onConfirm()).resolves.toBeUndefined();
    //     fireEvent.transitionEnd(container.querySelector('.xy-messagebox-content'));
    //     const messagebox = container.querySelector('.xy-messagebox');
    //     expect(messagebox.classList.contains('xy-messagebox-open')).toBeFalsy();
    // });

    test("onCancel", () => {
        const container = document.createElement("div");
        document.body.append(container);
        const onCancel = jest.fn();
        const wrapper = render(<Confirm message="消息" onCancel={onCancel} confirmText="a" cancelText="b" getContainer={container} />, { container });

        fireEvent.click(container.querySelector(".cancel-btn"));
        fireEvent.transitionEnd(container.querySelector(".xy-messagebox-content"));
        const messagebox = container.querySelector(".xy-messagebox");
        expect(messagebox.classList.contains("xy-messagebox-open")).toBeFalsy();
        expect(onCancel).toBeCalled();
    });
});
