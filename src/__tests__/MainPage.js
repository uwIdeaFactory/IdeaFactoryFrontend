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

    test('renders project upload button', () => {
        const uploadButton = screen.getByRole('button', { name: /upload/i });
        expect(uploadButton).toBeInTheDocument();
    });

    test('renders search input', () => {
        const searchInput = screen.getByPlaceholderText(/search/i);
        expect(searchInput).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        const homeLink = screen.getByRole('link', { name: /home/i });
        const nav2Link = screen.getByText(/navigation 2/i);
        const nav3Link = screen.getByText(/navigation 3/i);

        expect(homeLink).toBeInTheDocument();
        expect(nav2Link).toBeInTheDocument();
        expect(nav3Link).toBeInTheDocument();
    });

    test('renders pagination', () => {
        const paginationElement = screen.getByRole('navigation');
        expect(paginationElement).toBeInTheDocument();
    });

    test('renders footer', () => {
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
    });

    // test('clicking search button triggers search', () => {
    //     const searchInput = screen.getByPlaceholderText(/search/i);
    //     const searchValue = 'Test search';
    //     fireEvent.change(searchInput, { target: { value: searchValue } });

    //     const onSearch = jest.spyOn(global, 'alert');
    //     fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter' });
    //     expect(onSearch).toHaveBeenCalledWith(searchValue);
    // });
});