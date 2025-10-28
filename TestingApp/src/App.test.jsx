import React from "react";
import {render, screen} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"
import App from "./App"


describe("App component test", () => {
    render(<App />)
    it("should have the dummy display text", () => {
        expect(screen.getByText("Vite + React")).toBeInTheDocument();
    })
});