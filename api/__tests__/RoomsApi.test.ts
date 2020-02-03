import RoomsApi from "../RoomsApi"
import { mockRoomData } from "../../mock/mockRoomData"
import { defaultRoomData } from "../../data/defaultRoomData"

describe("RoomsApi", () => {
  it("gets room data", () => {
    localStorage.setItem("rooms", JSON.stringify(mockRoomData))
    const data = RoomsApi.getRoomData()
    expect(data).toEqual(mockRoomData)
  })

  it("sets default data if data does not exist", () => {
    localStorage.removeItem("rooms")
    const data = RoomsApi.getRoomData()
    expect(data).toEqual(defaultRoomData)
  })
})
