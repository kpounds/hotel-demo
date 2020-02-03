import React from "react"
import { render } from "@testing-library/react"
import Rooms from ".."
import RoomsStore from "../../../stores/RoomsStore"

const mockRoomsStore = new RoomsStore()

describe("Rooms", () => {
  it("Should render default number of rooms in list", () => {
    const { container } = render(<Rooms roomsStore={mockRoomsStore} />)

    const rooms = container.querySelectorAll(".room-container")
    expect(rooms.length).toBe(mockRoomsStore.roomData.length)
  })
})
