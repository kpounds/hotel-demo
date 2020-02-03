import React from "react"
import ReactDOM from "react-dom"
import Home from ".."
import RoomsStore from "../../stores/RoomsStore"

const mockRoomsStore = new RoomsStore()

describe("Home page", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Home roomsStore={mockRoomsStore} />, div)
  })
  // TODO: create test for clicking submit button
  // TODO: test for checking loading...
})
