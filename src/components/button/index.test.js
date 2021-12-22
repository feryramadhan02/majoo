/* eslint-disable testing-library/no-container */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Button from "./index";

test("Should render loading/spinner", () => {
    render(<Button isLoading></Button>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("Should render <Link> component", () => {
    render(
        <Router>
            <Button href="" type="link"></Button>
        </Router>
    );
    expect(screen.getByRole('link', { href: "" })).toBeInTheDocument();
});