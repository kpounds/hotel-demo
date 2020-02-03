import { SyntheticEvent, Component } from "react"
import RoomsApi from "../api/RoomsApi"
import RoomsStore from "../stores/RoomsStore"
import { inject, observer } from "mobx-react"
import Rooms from "../components/Rooms"
import styled from "styled-components"
import RoomList from "../models/RoomList"

interface IHomeProps {
  roomsStore: RoomsStore
}

const StyledButton = styled.button`
  margin: 7px;
`

@inject("roomsStore")
@observer
class Home extends Component<IHomeProps> {
  public render() {
    const { roomsStore } = this.props
    const handleChangeValue = (
      e: SyntheticEvent,
      room: number,
      key: "selected" | "adults" | "children"
    ) => {
      const checkBox = e.target as HTMLInputElement
      const select = e.target as HTMLSelectElement
      const current = roomsStore.roomData
      const roomToChange = current.findIndex(x => x.room === room)
      key === "selected"
        ? (current[roomToChange][key] = checkBox.checked)
        : (current[roomToChange][key] = parseInt(select.value))
      // map over the current state of room data
      current.map(item => {
        // if the change action is a checkbox
        if (key === "selected") {
          // checked room is the current mapped room and is not checked
          if (room === item.room && !checkBox.checked) {
            // reset values
            item.adults = 1
            item.children = 0
          }
          // checked room is greater than current mapped room and value is checked
          if (room > item.room && checkBox.checked) {
            // set to checked
            item.selected = true
          }
          // checked room is less than the current mapped room and value is unchecked
          if (room < item.room && !checkBox.checked) {
            // set previous rooms to unchecked and reset values
            item.selected = false
            item.adults = 1
            item.children = 0
          }
        }
        // TODO: reset values if selected is false.
        return item
      })
      roomsStore.updateRoomData(current)
    }
    return (
      <div>
        <Rooms handleChangeValue={handleChangeValue} />
        <StyledButton type="submit" onClick={() => roomsStore.submitRoomData()}>
          Submit
        </StyledButton>
        {roomsStore.loading && <div>Loading...</div>}
      </div>
    )
  }
  public componentDidMount() {
    const { roomsStore } = this.props
    // get user's saved data or default values once on mount
    const data = RoomsApi.getRoomData()
    roomsStore.updateRoomData(data)
  }
}

export default Home
