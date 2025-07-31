'use client';
const { useContext, createContext } = require("react");

const UserContext = createContext(null);

export function UserProvider({children,data,isLogged,isOwner}){

    return(
        <UserContext.Provider value={{data,isLogged,isOwner}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext) ;
}
