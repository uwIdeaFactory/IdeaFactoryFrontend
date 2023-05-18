/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../AuthContext.mock';
import SignUp from '../auth/SignUp';

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

jest.mock('../AuthContext', () => {
    return {
        useAuth: jest.fn(() => require('../AuthContext.mock').useAuth()),
    };
});

describe('SignUp component tests', () => {
    beforeEach(() => {
        render(
            <Router>
                <SignUp />
            </Router>
        );
    });

    // test('renders SignUp component', () => {
    //     const signUpElement = screen.getByText(/Sign Up/i);
    //     expect(signUpElement).toBeInTheDocument();
    // });

    test('renders email input field', () => {
        const emailInput = screen.getByLabelText(/Email/i);
        expect(emailInput).toBeInTheDocument();
    });

    test('renders password input field', () => {
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();
    });

    // test('renders submit button', () => {
    //     const submitButton = screen.getByRole('button', { name: /submit/i });
    //     expect(submitButton).toBeInTheDocument();
    // });

    test('renders Log in link', () => {
        const logInLink = screen.getByText(/Log in/i);
        expect(logInLink).toBeInTheDocument();
    });
});
