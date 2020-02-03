import React from "react"
import ReactDOM from "react-dom"
import { render, fireEvent } from "@testing-library/react"
import Home from ".."
import RoomsStore from "../../stores/RoomsStore"
import { mockRoomData } from "../../mock/mockRoomData"
import { defaultRoomData } from "../../data/defaultRoomData"
import RoomsApi from "../../api/RoomsApi"

// set up some defaults and overrides
const mockRoomsStore = new RoomsStore()
mockRoomsStore.roomData = defaultRoomData
localStorage.setItem("rooms", JSON.stringify(defaultRoomData))
mockRoomsStore.updateRoomData = data => {
  mockRoomsStore.roomData = data
}
RoomsApi.setRoomData = async data => {
  localStorage.setItem("rooms", JSON.stringify(data))
}

describe("Home page", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Home roomsStore={mockRoomsStore} />, div)
  })

  it("Submits the set room data when submit is clicked", () => {
    const { container } = render(<Home roomsStore={mockRoomsStore} />)
    // change the data
    mockRoomsStore.updateRoomData(mockRoomData)
    // set up and click submit
    const submitBtn = container.querySelector(".room-submit")!
    fireEvent.click(submitBtn)
    // check that data matches in local storage with what is expected
    expect(localStorage.getItem("rooms")).toContain(
      JSON.stringify(mockRoomData)
    )
  })

  it("Renders loading when loading prop is true", () => {
    mockRoomsStore.loading = true
    const { container } = render(<Home roomsStore={mockRoomsStore} />)

    const loadingDiv = container.querySelector(".loading")
    expect(loadingDiv).not.toBeNull()
  })

  it("Does not render loading when loading prop is false", () => {
    mockRoomsStore.loading = false
    const { container } = render(<Home roomsStore={mockRoomsStore} />)

    const loadingDiv = container.querySelector(".loading")
    expect(loadingDiv).toBeNull()
  })
})
