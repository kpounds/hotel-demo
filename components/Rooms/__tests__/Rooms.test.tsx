import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Rooms from ".."
import RoomsStore from "../../../stores/RoomsStore"
import RoomList from "../../../models/RoomList"
import { mockRoomData } from "../../../mock/mockRoomData"
import Home from "../../../pages"

const mockRoomsStore = new RoomsStore()
mockRoomsStore.updateRoomData = (mockData: RoomList[]) => {
  mockRoomsStore.roomData = mockData
}
localStorage.setItem("rooms", JSON.stringify(mockRoomData))

describe("Rooms", () => {
  it("Should render default number of rooms in list", () => {
    const { container } = render(<Rooms roomsStore={mockRoomsStore} />)

    const rooms = container.querySelectorAll(".room-container")
    expect(rooms.length).toBe(mockRoomsStore.roomData.length)
  })

  it("Should check any boxes for rooms before it when checked and not be disabled", () => {
    const { container } = render(<Rooms roomsStore={mockRoomsStore} />)

    const room4Select = container.querySelector('input[title="Room 4 select"]')!
    fireEvent.click(room4Select)

    const room2Data = mockRoomsStore.roomData.filter(x => x.room === 2)[0]
    const room2Div = container.querySelector(".room-2")!
    expect(room2Data.selected).toBeTruthy()
    expect(room2Div.getAttribute("disabled")).toBeNull()
  })

  it("Should uncheck any boxes for rooms after it when unchecked and be disabled", () => {
    // set data to mocked data
    mockRoomsStore.updateRoomData(mockRoomData)
    const { container } = render(<Rooms roomsStore={mockRoomsStore} />)

    const room2Select = container.querySelector('input[title="Room 2 select"]')!
    fireEvent.click(room2Select)

    // unchecking 2nd room should cause 3rd room to be unchecked as well
    const room3Data = mockRoomsStore.roomData.filter(x => x.room === 3)[0]
    const room3Div = container.querySelector(".room-3")!
    expect(room3Data.selected).toBeFalsy()
    expect(room3Div.getAttribute("disabled")).not.toBeNull()
  })

  it("Should match select box values with localStorage on first render", () => {
    // need to render Home here to force component did mount to get local storage data
    const { container } = render(
      <Home roomsStore={mockRoomsStore}>
        <Rooms roomsStore={mockRoomsStore} />
      </Home>
    )

    const room3AdultSelect = container.querySelector(
      'select[name="adults-3"]'
    )! as HTMLSelectElement
    const room3ChildSelect = container.querySelector(
      'select[name="children-3"]'
    )! as HTMLSelectElement

    expect(parseInt(room3AdultSelect.value)).toBe(mockRoomData[2].adults)
    expect(parseInt(room3ChildSelect.value)).toBe(mockRoomData[2].children)
  })

  it("Should update store with select values when changed", () => {
    const { container } = render(<Rooms roomsStore={mockRoomsStore} />)

    const room4AdultSelect = container.querySelector(
      'select[name="adults-4"]'
    )! as HTMLSelectElement
    const room4ChildSelect = container.querySelector(
      'select[name="children-4"]'
    )! as HTMLSelectElement

    fireEvent.change(room4AdultSelect, { target: { value: "2" } })
    expect(mockRoomsStore.roomData[3].adults).toBe(
      parseInt(room4AdultSelect.value)
    )

    fireEvent.change(room4ChildSelect, { target: { value: "1" } })
    expect(mockRoomsStore.roomData[3].children).toBe(
      parseInt(room4ChildSelect.value)
    )
  })
})
