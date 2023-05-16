/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ProjectUploadPage from '../ProjectUploadPage'
import { BrowserRouter as Router } from 'react-router-dom';
// import { getAnalytics, isSupported } from "firebase/analytics";

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

describe('ProjectUploadPage component tests', () => {
    beforeEach(() => {
        render(
            <Router>
                <ProjectUploadPage />
            </Router>
        );
    });

    test('renders ProjectUploadPage component', () => {
        const projectUploadPageElement = screen.getByRole('main');
        expect(projectUploadPageElement).toBeInTheDocument();
    });

    test('renders navigation component', () => {
        const navigationElement = screen.getByRole('banner');
        expect(navigationElement).toBeInTheDocument();
    });

    test('renders footer', () => {
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
    });
});

