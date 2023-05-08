import React from 'react';

export const AuthContext = React.createContext();

export const useAuth = () => {
    return {
        user: {
            uid: "test_uid",
            email: "test@example.com",
        },
        login: jest.fn(),
    };
};
