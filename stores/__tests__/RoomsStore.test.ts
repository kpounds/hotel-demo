import RoomsStore from "../RoomsStore"
import { defaultRoomData } from "../../data/defaultRoomData"
import { mockRoomData } from "../../mock/mockRoomData"

const mockStore = new RoomsStore()

describe("RoomsStore", () => {
  it("updates roomData", () => {
    mockStore.roomData = defaultRoomData
    expect(mockStore.roomData).toEqual(defaultRoomData)
    mockStore.updateRoomData(mockRoomData)
    expect(mockStore.roomData[2]).toEqual(mockRoomData[2])
  })

  it("submits roomData", async () => {
    await mockStore.submitRoomData()
    const updatedData = localStorage.getItem("rooms")
    expect(JSON.parse(updatedData!)).toEqual(mockStore.roomData)
  })
})
