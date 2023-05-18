/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../AuthContext.mock';
import SignIn from '../auth/SignIn';

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

describe('SignIn component tests', () => {
    beforeEach(() => {
        render(
            <Router>
                <SignIn />
            </Router>
        );
    });

    // test('renders SignIn component heading', () => {
    //     const signInHeading = screen.getByRole('heading', { name: /Log In/i });
    //     expect(signInHeading).toBeInTheDocument();
    // });


    test('renders email input field', () => {
        const emailInput = screen.getByLabelText(/Email/i);
        expect(emailInput).toBeInTheDocument();
    });

    test('renders password input field', () => {
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();
    });

    test('renders submit button', () => {
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeInTheDocument();
    });

//     test('renders Log In with Google button', () => {
//         const googleSignInButton = screen.getByRole('button', { name: /Log In with Google/i });
//         expect(googleSignInButton).toBeInTheDocument();
//     });

    test('renders Sign Up link', () => {
        const signUpLink = screen.getByText(/Sign Up/i);
        expect(signUpLink).toBeInTheDocument();
    });
});
