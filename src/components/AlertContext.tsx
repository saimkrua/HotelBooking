// AuthContext.tsx
"use client"
import React, { createContext, useState, ReactNode } from 'react';

interface AlertContextProps {
    text: string;
    type: string;
    setAlert: (text: string, type: string) => void;
}

interface AlertProviderProps {
    children: ReactNode;
}

const ALERT_TIME = 5000;
const initialState = {
    text: '',
    type: '',
};

const AlertContext = createContext<AlertContextProps>({
    ...initialState,
    setAlert: () => { },
});

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [text, setText] = useState('');
    const [type, setType] = useState('');

    const setAlert = (text: string, type: string) => {
        setText(text);
        setType(type);

        setTimeout(() => {
            setText('');
            setType('');
        }, ALERT_TIME);
    };

    return (
        <AlertContext.Provider
            value={{
                text,
                type,
                setAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
