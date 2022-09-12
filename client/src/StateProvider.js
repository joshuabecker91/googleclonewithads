import React, { createContext, useContext, useReducer } from 'react';

// Prepares data layer for app
export const StateContext = createContext();

// Higher order component
export const StateProvider = ({ reducer, initialState, children}) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

// Hook allows us to pull information from the data layer
export const useStateValue = () => useContext(StateContext);