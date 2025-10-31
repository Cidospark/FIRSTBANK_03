import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";

import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"
import App from "./App"



describe("App component test", () => {
    
    render(<App/>)
    it("should have the dummy display text", () => {
        // render(<App />)
        expect(screen.getByText("Vite + React")).toBeInTheDocument();
    })

    it("should increment counter onclick", ()=>{
        const btn = screen.getByRole("button", {name:/count/i})
        expect(screen.getByText("count is 0")).toBeInTheDocument();
        fireEvent.click(btn)
        expect(screen.getByText("count is 1")).toBeInTheDocument();

    })
});