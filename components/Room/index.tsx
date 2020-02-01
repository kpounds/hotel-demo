import React from "react"
import RoomList from "../../models/RoomList"

interface IRoomProps {
  roomData: RoomList
}

const Room: React.FunctionComponent<IRoomProps> = ({ roomData }) => {
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
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <label htmlFor={`children-${roomData.room}`}>Children (0-17)</label>
      <select
        name={`children-${roomData.room}`}
        id={`children-${roomData.room}`}
        defaultValue={roomData.children}
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
