import { FunctionComponent } from "react"
import Rooms from "../components/Rooms"
import styled from "styled-components"
import { useRoomStore } from "../providers/StoreProvider"

const StyledButton = styled.button`
  margin: 7px;
`

const Home: FunctionComponent = () => {
  const { submitRoomData, loading } = useRoomStore()
  return (
    <div>
      <Rooms />
      <StyledButton
        type="submit"
        title="Submit and Save Results"
        className="room-submit"
        onClick={() => submitRoomData()}
      >
        Submit
      </StyledButton>
      {loading && <div className="loading">Loading...</div>}
    </div>
  )
}

export default Home
