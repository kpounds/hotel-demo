import { NextPage } from "next"
import useSWR from "swr"
import Room from "../components/Room"
import RoomsApi from "../api/RoomsApi"

const Home: NextPage = () => {
  const { data } = useSWR("/api/data", RoomsApi.getRoomData)
  const testData = [
    {
      room: 1,
      selected: true,
      adults: 1,
      children: 0
    },
    {
      room: 2,
      selected: true,
      adults: 2,
      children: 1
    },
    {
      room: 3,
      selected: true,
      adults: 1,
      children: 2
    },
    {
      room: 4,
      selected: false,
      adults: 1,
      children: 0
    }
  ]
  if (!data) return <div>Loading...</div>
  return (
    <div>
      {data.map(roomData => {
        return <Room key={roomData.room} roomData={roomData} />
      })}
      <button type="submit" onClick={() => RoomsApi.setRoomData(testData)}>
        Submit
      </button>
    </div>
  )
}

export default Home
