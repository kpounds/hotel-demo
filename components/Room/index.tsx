import React, { SyntheticEvent } from "react"
import RoomList from "../../models/RoomList"

interface IRoomProps {
  roomData: RoomList
  changeRoomData: (data: RoomList) => void
}

const Room: React.FunctionComponent<IRoomProps> = ({
  roomData,
  changeRoomData
}) => {
  const handleChangeCheckbox = (e: SyntheticEvent, key: "selected") => {
    const input = e.target as HTMLInputElement
    const updatedRoomData: RoomList = roomData
    updatedRoomData[key] = input.checked
    changeRoomData(updatedRoomData)
  }
  const handleChangeSelect = (
    e: SyntheticEvent,
    key: "adults" | "children"
  ) => {
    const input = e.target as HTMLSelectElement
    const updatedRoomData: RoomList = roomData
    updatedRoomData[key] = input.selectedIndex
    changeRoomData(updatedRoomData)
  }
  return (
    <div>
      <h4>
        {roomData.room !== 1 ? (
          <>
            <input
              type="checkbox"
              defaultChecked={roomData.selected}
              name={`roomCheck-${roomData.room}`}
              id={`roomCheck-${roomData.room}`}
              onChange={e => handleChangeCheckbox(e, "selected")}
            />
            <label htmlFor={`roomCheck-${roomData.room}`}>
              Room {roomData.room}
            </label>
          </>
        ) : (
          <span>Room {roomData.room}</span>
        )}
      </h4>
      <label htmlFor={`adults-${roomData.room}`}>Adults (18+)</label>
      <select
        name={`adults-${roomData.room}`}
        id={`adults-${roomData.room}`}
        defaultValue={roomData.adults}
        onChange={e => handleChangeSelect(e, "adults")}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <label htmlFor={`children-${roomData.room}`}>Children (0-17)</label>
      <select
        name={`children-${roomData.room}`}
        id={`children-${roomData.room}`}
        defaultValue={roomData.children}
        onChange={e => handleChangeSelect(e, "children")}
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <p>
        It has {roomData.adults} adults and {roomData.children} children
      </p>
    </div>
  )
}

export default Room
