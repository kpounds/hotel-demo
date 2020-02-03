import { Component } from "react"
import RoomsApi from "../api/RoomsApi"
import RoomsStore from "../stores/RoomsStore"
import { inject } from "mobx-react"
import Rooms from "../components/Rooms"
import styled from "styled-components"

interface IHomeProps {
  roomsStore: RoomsStore
}

const StyledButton = styled.button`
  margin: 7px;
`

@inject("roomsStore")
class Home extends Component<IHomeProps> {
  public render() {
    const { roomsStore } = this.props
    return (
      <div>
        <Rooms roomsStore={roomsStore} />
        <StyledButton type="submit" onClick={() => roomsStore.submitRoomData()}>
          Submit
        </StyledButton>
        {roomsStore.loading && <div>Loading...</div>}
      </div>
    )
  }
  public componentDidMount() {
    const { roomsStore } = this.props
    // get user's saved data or default values once on mount
    const data = RoomsApi.getRoomData()
    roomsStore.updateRoomData(data)
  }
}

export default Home
