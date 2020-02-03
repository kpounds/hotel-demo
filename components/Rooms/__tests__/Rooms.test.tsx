import React from "react"
import { render } from "@testing-library/react"
import Rooms from ".."
import RoomsStore from "../../../stores/RoomsStore"
import RoomList from "../../../models/RoomList"
import { mockRoomData } from "../../../mock/mockRoomData"

const mockRoomsStore = new RoomsStore()
mockRoomsStore.updateRoomData = (mockData: RoomList[]) => {
  mockRoomsStore.roomData = mockRoomData
}

describe("Rooms", () => {
  it("Should render default number of rooms in list", () => {
    const { container } = render(<Rooms roomsStore={mockRoomsStore} />)

    const rooms = container.querySelectorAll(".room-container")
    expect(rooms.length).toBe(mockRoomsStore.roomData.length)
  })

  // TODO: tests for clicking check boxes
  // TODO: test for checking disabled state
  // TODO: test for validating against local storage on load
})
