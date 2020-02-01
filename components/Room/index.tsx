import React from "react"
import RoomList from "../../models/RoomList"

interface IRoomProps {
  roomData: RoomList
}

const Room: React.FunctionComponent<IRoomProps> = ({ roomData }) => {
  return (
    <div>
      <h4>
        {roomData.room !== 1 && (
          <input type="checkbox" defaultChecked={roomData.selected} />
        )}
        Room {roomData.room}
      </h4>
      <label htmlFor="adults">Adults (18+)</label>
      <select name="adults" id="adults" defaultValue={roomData.adults}>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <label htmlFor="children">Children (0-17)</label>
      <select name="children" id="children" defaultValue={roomData.children}>
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
