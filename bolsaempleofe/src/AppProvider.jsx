import { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider(props) {
    const [puestosState, setPuestosState] = useState({
        puestos: [],
    });

    return (
        <AppContext.Provider value={{
            puestosState: puestosState,
            setPuestosState: setPuestosState,
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };
