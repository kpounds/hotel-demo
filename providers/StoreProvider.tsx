import React, { useContext } from "react"
import RoomsStore from "../stores/RoomsStore"

type StoreProviderProps = {
  children: any
}

// Sets up store context
const roomsStore = new RoomsStore()
export const RoomStoreContext = React.createContext<RoomsStore>(roomsStore)
export const useRoomStore = () => useContext(RoomStoreContext)

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <RoomStoreContext.Provider value={roomsStore}>
      {children}
    </RoomStoreContext.Provider>
  )
}
