import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

// This is some confusing stuff at first, I will need to revisit this to make 
// improvements

export interface globalAppInterface {
    userLoggedIn: boolean;
    userName: string;
    displayName: string;
    avatar: string;
}

const globalAppContext = createContext({
    userLoggedIn: {} as Partial<globalAppInterface>,
    setState: {} as Dispatch<SetStateAction<Partial<globalAppInterface>>>,
})

const defaultGlobalState: globalAppInterface = {
    userLoggedIn: false,
    userName: 'Log In',
    displayName: 'Log In',
    avatar: '',
}

const GlobalAppProvider = ({
    children, value = defaultGlobalState,
}: {
    children: React.ReactNode;
    value?: Partial<globalAppInterface>;
}) => {
    const [userLoggedIn, setState] = useState(value);
    return (
        <globalAppContext.Provider value={{userLoggedIn, setState}}>
            {children}
        </globalAppContext.Provider>
    );
};

const useGlobalAppState = () => {
    const context = useContext(globalAppContext);
    if (!context) {
        throw new Error("useGlobalAppState must be used within a globalAppContext");
    }
    return context;
};

export { GlobalAppProvider, useGlobalAppState }