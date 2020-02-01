import React from "react"
import RoomList from "../../models/RoomList"

interface IRoomProps {
  roomData: RoomList
}

const Room: React.FunctionComponent<IRoomProps> = ({ roomData }) => {
  return (
    <>
      <div>
        <p>This is room {roomData.room}</p>
        <p>It is {roomData.selected ? "Checked" : "Not Checked"}</p>
        <p>
          It has {roomData.adults} adults and {roomData.children} children
        </p>
      </div>
    </>
  )
}

export default Room
