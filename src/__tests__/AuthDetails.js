/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AuthDetails from '../auth/AuthDetails'
// import { getAnalytics, isSupported } from "firebase/analytics";

test('renders the AuthDetails component', async () => {
    // const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
    render(<AuthDetails />);
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
});
