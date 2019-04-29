import React from "react";
import { render, fireEvent, act } from "react-testing-library";
import { MessageBox } from "../src";

describe("MessageBox", () => {
    test("render", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(
            <MessageBox getContainer={container}>
                <p>Hello</p>
            </MessageBox>,
            { container }
        );
        const p = wrapper.getByText("Hello");
        expect(p.textContent).toBe("Hello");
    });

    test("hide scroll", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(
            <MessageBox fixed={false} visible={false} getContainer={container}>
                <p>Hello</p>
            </MessageBox>,
            { container }
        );
        expect(container.style.overflow).toBe("auto");
        wrapper.rerender(
            <MessageBox fixed={false} visible={true} getContainer={container}>
                <p>Hello</p>
            </MessageBox>
        );
        expect(container.style.overflow).toBe("hidden");

        const wrapper2 = render(
            <MessageBox visible={false} getContainer={container}>
                <p>Hello</p>
            </MessageBox>,
            { container }
        );
        expect(document.body.style.overflow).toBe("auto");
        wrapper2.rerender(
            <MessageBox visible={true} getContainer={container}>
                <p>Hello</p>
            </MessageBox>
        );
        expect(document.body.style.overflow).toBe("hidden");
    });

    test("initial focus", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(
            <div>
                <button>对话框外面的按钮</button>
                <MessageBox visible={false} getContainer={container} initialFocus=".btn">
                    <button className="btn">对话框内按钮</button>
                </MessageBox>
            </div>,
            { container }
        );
        const outBtn = wrapper.getByText("对话框外面的按钮");
        outBtn.focus();
        expect(document.activeElement).toBe(outBtn);

        wrapper.rerender(
            <div>
                <button>对话框外面的按钮</button>
                <MessageBox visible={true} getContainer={container} initialFocus=".btn">
                    <button className="btn">对话框内按钮</button>
                </MessageBox>
            </div>
        );

        fireEvent.transitionEnd(container.querySelector(".xy-messagebox-content"));
        const inBtn = wrapper.getByText("对话框内按钮");
        expect(document.activeElement).toBe(inBtn);

        wrapper.rerender(
            <div>
                <button>对话框外面的按钮</button>
                <MessageBox visible={false} getContainer={container} initialFocus=".btn">
                    <button className="btn">对话框内按钮</button>
                </MessageBox>
            </div>
        );

        fireEvent.transitionEnd(container.querySelector(".xy-messagebox-content"));
        expect(document.activeElement).toBe(outBtn);
    });

    test("not fixed", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(
            <MessageBox visible={false} fixed={false} getContainer={container}>
                abc
            </MessageBox>,
            { container }
        );

        const messagebox = container.querySelector(".xy-messagebox");
        expect(messagebox.classList.contains("use-container")).toBeTruthy();
    });

    test("hide mask", () => {
        const container = document.createElement("div");
        document.body.append(container);

        const wrapper = render(
            <MessageBox visible={false} showMask={false} getContainer={container}>
                abc
            </MessageBox>,
            { container }
        );

        expect(container.querySelector(".xy-messagebox-mask")).toBeNull();
    });

    test("close mask", () => {
        const container = document.createElement("div");
        document.body.append(container);

        render(
            <MessageBox defaultVisible={true} getContainer={container}>
                abc
            </MessageBox>,
            { container }
        );

        expect(container.querySelector(".xy-messagebox-mask")).not.toBeNull();
        fireEvent.click(container.querySelector(".xy-messagebox-mask"));
        const messagebox = container.querySelector(".xy-messagebox");
        expect(messagebox.classList.contains("xy-messagebox-open")).toBeFalsy();
    });

    test("close not mask", () => {
        const container = document.createElement("div");
        document.body.append(container);

        render(
            <MessageBox defaultVisible={true} maskClose={false} getContainer={container}>
                abc
            </MessageBox>,
            { container }
        );

        expect(container.querySelector(".xy-messagebox-mask")).not.toBeNull();
        fireEvent.click(container.querySelector(".xy-messagebox-mask"));
        const messagebox = container.querySelector(".xy-messagebox");
        expect(messagebox.classList.contains("xy-messagebox-open")).toBeTruthy();
    });

    test("esc close", () => {
        const container = document.createElement("div");
        document.body.append(container);

        render(
            <MessageBox defaultVisible={true} getContainer={container}>
                abc
            </MessageBox>,
            { container }
        );

        fireEvent.keyDown(container.querySelector(".xy-messagebox-content"), { keyCode: 27 });
        const messagebox = container.querySelector(".xy-messagebox");
        expect(messagebox.classList.contains("xy-messagebox-open")).toBeFalsy();
    });

    test("event", () => {
        const container = document.createElement("div");
        document.body.append(container);
        const onChange = jest.fn();
        const onKeyDown = jest.fn();
        const onUnmount = jest.fn();
        const onClose = jest.fn();

        render(
            <MessageBox defaultVisible={true} onChange={onChange} onKeyDown={onKeyDown} onUnmount={onUnmount} onClose={onClose} getContainer={container}>
                abc
            </MessageBox>,
            { container }
        );
        const messagebox = container.querySelector(".xy-messagebox");
        fireEvent.keyDown(container.querySelector(".xy-messagebox-content"), { keyCode: 33 });
        expect(onKeyDown.mock.calls.length).toBe(1);

        fireEvent.keyDown(container.querySelector(".xy-messagebox-content"), { keyCode: 27 });
        fireEvent.transitionEnd(container.querySelector(".xy-messagebox-content"));

        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.calls[0][0]).toBeFalsy();

        expect(onUnmount.mock.calls.length).toBe(1);
        expect(onClose.mock.calls.length).toBe(1);
        expect(messagebox.classList.contains("xy-messagebox-open")).toBeFalsy();
    });

    test("get close function", () => {
        const container = document.createElement("div");
        document.body.append(container);
        let close: Function;
        render(
            <MessageBox defaultVisible={true} getCloseFunc={(c) => (close = c)} getContainer={container}>
                abc
            </MessageBox>,
            { container }
        );
        const messagebox = container.querySelector(".xy-messagebox");
        act(() => close());
        fireEvent.transitionEnd(container.querySelector(".xy-messagebox-content"));
        expect(messagebox.classList.contains("xy-messagebox-open")).toBeFalsy();
    });
});
