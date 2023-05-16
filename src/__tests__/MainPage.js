/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../AuthContext.mock';
import MainPage from '../MainPage';

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


describe('MainPage component tests', () => {
    beforeEach(() => {
        render(
            <Router>
                <MainPage />
            </Router>
        );
    });

    test('renders MainPage component', () => {
        const mainPageElement = screen.getByRole('main');
        expect(mainPageElement).toBeInTheDocument();
    });

    test('renders search input', () => {
        const searchInput = screen.getByPlaceholderText(/search/i);
        expect(searchInput).toBeInTheDocument();
    });

    test('renders pagination', () => {
        const paginationElement = screen.getByRole('navigation');
        expect(paginationElement).toBeInTheDocument();
    });

    test('renders footer', () => {
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
    });
});