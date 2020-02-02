import RoomList from "../models/RoomList"
import { defaultRoomData } from "../data/defaultRoomData"

class RoomsApi {
  public getRoomData = (): RoomList[] => {
    let rooms: RoomList[] = []
    const data = localStorage.getItem("rooms")
    if (!data) {
      rooms = defaultRoomData
      this.setRoomData(rooms)
    } else {
      rooms = JSON.parse(data)
    }
    return rooms
  }

  public setRoomData = async (data: RoomList[]): Promise<void> => {
    localStorage.setItem("rooms", JSON.stringify(data))
    return
  }
}

export default new RoomsApi()
