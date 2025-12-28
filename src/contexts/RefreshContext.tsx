import React, { createContext, useContext, useState, useCallback } from 'react';

interface RefreshContextType {
    refreshKey: number;
    triggerRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType>({
    refreshKey: 0,
    triggerRefresh: () => { },
});

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = useCallback(() => {
        setRefreshKey(prev => prev + 1);
    }, []);

    return (
        <RefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};
