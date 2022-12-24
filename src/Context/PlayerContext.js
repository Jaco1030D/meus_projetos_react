import { createContext, useContext } from "react";


const PlayerContext = createContext()

export function PlayerProvider({children, value}){
    
    return <PlayerContext.Provider value={value} >{children}</PlayerContext.Provider>
}

export function usePlayerValue(){
    return useContext(PlayerContext)
}
