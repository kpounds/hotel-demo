import { SyntheticEvent, useEffect } from "react"
import RoomList from "../../models/RoomList"
import { observer } from "mobx-react"
import { NextPage } from "next"
import {
  FlexContainer,
  StyledRoom,
  StyledHeader,
  SelectContainer,
  SelectLabel
} from "../Style"
import { useRoomStore } from "../../providers/StoreProvider"
import RoomsApi from "../../api/RoomsApi"

const Rooms: NextPage = observer(() => {
  const { roomData, updateRoomData } = useRoomStore()
  useEffect(() => {
    const data = RoomsApi.getRoomData()
    updateRoomData(data)
  }, [])
  const handleChangeCheckbox = (e: SyntheticEvent, room: number) => {
    const checkBox = e.target as HTMLInputElement
    const current = roomData
    const roomToChange = current.findIndex(x => x.room === room)
    current[roomToChange]["selected"] = checkBox.checked
    // map over the current state of room data
    current.map(item => {
      // checked room is the current mapped room and is not checked
      if (room === item.room && !checkBox.checked) {
        // reset values
        item.adults = 1
        item.children = 0
      }
      // checked room is greater than current mapped room and value is checked
      if (room > item.room && checkBox.checked) {
        // set current map room to checked
        item.selected = true
      }
      // checked room is less than the current mapped room and value is unchecked
      if (room < item.room && !checkBox.checked) {
        // set previous rooms to unchecked and reset values
        item.selected = false
        item.adults = 1
        item.children = 0
      }
      return item
    })
    updateRoomData(current)
  }
  const handleChangeSelect = (
    e: SyntheticEvent,
    room: number,
    key: "adults" | "children"
  ) => {
    const select = e.target as HTMLSelectElement
    const current = roomData
    const roomToChange = current.findIndex(x => x.room === room)
    current[roomToChange][key] = parseInt(select.value)
    updateRoomData(current)
  }
  return (
    <FlexContainer>
      {roomData.map((room: RoomList) => {
        return (
          <StyledRoom
            disabled={!room.selected}
            className={`room-container room-${room.room}`}
            key={room.room}
          >
            <StyledHeader disabled={!room.selected}>
              {room.room !== 1 ? (
                <>
                  <input
                    type="checkbox"
                    checked={room.selected}
                    name={`roomCheck-${room.room}`}
                    title={`Room ${room.room} select`}
                    id={`roomCheck-${room.room}`}
                    onChange={e => handleChangeCheckbox(e, room.room)}
                  />
                  <label htmlFor={`roomCheck-${room.room}`}>
                    Room {room.room}
                  </label>
                </>
              ) : (
                <span>Room {room.room}</span>
              )}
            </StyledHeader>
            <FlexContainer>
              <SelectContainer>
                <SelectLabel htmlFor={`adults-${room.room}`}>
                  Adults
                  <br />
                  (18+)
                </SelectLabel>
                <select
                  name={`adults-${room.room}`}
                  id={`adults-${room.room}`}
                  value={room.adults}
                  title={`Select number of adults for room ${room.room}`}
                  disabled={!room.selected}
                  onChange={e => handleChangeSelect(e, room.room, "adults")}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </SelectContainer>
              <SelectContainer>
                <SelectLabel htmlFor={`children-${room.room}`}>
                  Children
                  <br />
                  (0-17)
                </SelectLabel>
                <select
                  name={`children-${room.room}`}
                  id={`children-${room.room}`}
                  value={room.children}
                  title={`Select number of children for room ${room.room}`}
                  disabled={!room.selected}
                  onChange={e => handleChangeSelect(e, room.room, "children")}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </SelectContainer>
            </FlexContainer>
          </StyledRoom>
        )
      })}
    </FlexContainer>
  )
})

export default Rooms
