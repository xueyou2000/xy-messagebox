import React from "react";
import { render } from "react-testing-library";
import { MessageBox } from "../src";

describe("MessageBox", () => {
    test("render", () => {
        const wrapper = render(<MessageBox><p>Hello</p></MessageBox>);
        const p = wrapper.getByText("Hello");
        expect(p.textContent).toBe("Hello");
    });
});
