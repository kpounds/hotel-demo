import { SyntheticEvent, Component } from "react"
import RoomsApi from "../api/RoomsApi"
import RoomList from "../models/RoomList"
import RoomsStore from "../stores/RoomsStore"
import { inject, observer } from "mobx-react"
import Rooms from "../components/Rooms"

interface IHomeProps {
  roomsStore: RoomsStore
}

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

      current.map(item => {
        if (key === "selected") {
          room > item.room && checkBox.checked
            ? (item.selected = true)
            : room < item.room && !checkBox.checked
            ? (item.selected = false)
            : null
        }
        return item
      })
      roomsStore.updateRoomData(current)
    }
    return (
      <div>
        <Rooms handleChangeValue={handleChangeValue} />
        <button type="submit" onClick={() => roomsStore.submitRoomData()}>
          Submit
        </button>
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
