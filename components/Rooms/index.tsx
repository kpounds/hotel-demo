import { SyntheticEvent } from "react"
import RoomList from "../../models/RoomList"
import { useObserver } from "mobx-react"
import RoomsStore from "../../stores/RoomsStore"
import { NextPage } from "next"
import {
  FlexContainer,
  StyledRoom,
  StyledHeader,
  SelectContainer,
  SelectLabel
} from "../Style"

interface IRoomProps {
  roomsStore: RoomsStore
}

const Rooms: NextPage<IRoomProps> = ({ roomsStore }) => {
  const handleChangeValue = (
    e: SyntheticEvent,
    room: number,
    key: "selected" | "adults" | "children",
    roomsStore: RoomsStore
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
      // if the event action is a checkbox
      if (key === "selected") {
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
      }
      return item
    })
    roomsStore.updateRoomData(current)
  }
  return useObserver(() => (
    <FlexContainer>
      {roomsStore.roomData.map((room: RoomList) => {
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
                    onChange={e =>
                      handleChangeValue(e, room.room, "selected", roomsStore)
                    }
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
                  onChange={e =>
                    handleChangeValue(e, room.room, "adults", roomsStore)
                  }
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
                  onChange={e =>
                    handleChangeValue(e, room.room, "children", roomsStore)
                  }
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
  ))
}

export default Rooms
