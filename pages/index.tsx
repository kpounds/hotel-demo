import { NextPage } from "next"
import Room from "../components/Room"
import RoomsApi from "../api/RoomsApi"
import RoomList from "../models/RoomList"
import { useState, useEffect, SyntheticEvent } from "react"

const Home: NextPage<{ defaultData: RoomList[] }> = ({
  defaultData = [new RoomList()]
}) => {
  const [roomData, setRoomData] = useState(defaultData)
  useEffect(() => {
    // get user's saved data or default values once on mount
    const data = RoomsApi.getRoomData()
    setRoomData(data)
  }, [])
  const handleChangeValue = (
    e: SyntheticEvent,
    room: number,
    key: "selected" | "adults" | "children"
  ) => {
    const checkBox = e.target as HTMLInputElement
    const select = e.target as HTMLSelectElement
    const current = roomData
    const roomToChange = current.findIndex(x => x.room === room)
    key === "selected"
      ? (current[roomToChange][key] = checkBox.checked)
      : (current[roomToChange][key] = parseInt(select.value))
    console.log(current)
    setRoomData(current)
  }
  if (!roomData) return <div>Loading...</div>
  return (
    <div>
      <form>
        {roomData.map((item: RoomList) => {
          return (
            <Room
              key={item.room}
              roomData={item}
              checked={item.selected}
              handleChangeValue={handleChangeValue}
            />
          )
        })}
        <button type="submit" onClick={() => RoomsApi.setRoomData(roomData)}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Home
