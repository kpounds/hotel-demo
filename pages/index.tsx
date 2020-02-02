import { NextPage } from "next"
import Room from "../components/Room"
import RoomsApi from "../api/RoomsApi"
import RoomList from "../models/RoomList"
import { useState, useEffect } from "react"

const Home: NextPage<{ defaultData: RoomList[] }> = ({
  defaultData = [new RoomList()]
}) => {
  const [roomData, setRoomData] = useState(defaultData)
  useEffect(() => {
    // get user's saved data or default values once on mount
    const data = RoomsApi.getRoomData()
    setRoomData(data)
  }, [])
  // method to change individual room data and store in state
  const handleChangeRoomData = (data: RoomList) => {
    const current = roomData
    const roomToChange = current.findIndex(x => x.room === data.room)
    current[roomToChange] = data
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
              changeRoomData={handleChangeRoomData}
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
