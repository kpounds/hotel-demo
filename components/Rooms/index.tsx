import React, { SyntheticEvent, useState, useEffect, Component } from "react"
import RoomList from "../../models/RoomList"
import { inject, observer } from "mobx-react"
import RoomsStore from "../../stores/RoomsStore"
import styled from "styled-components"

interface IRoomProps {
  handleChangeValue: (
    e: SyntheticEvent,
    room: number,
    key: "selected" | "adults" | "children"
  ) => void
  roomsStore?: RoomsStore
}

const FlexContainer = styled.div`
  display: flex;
`

const StyledRoom = styled.div`
  max-width: 200px;
  border: 2px solid #e0dfdf;
  border-radius: 5px;
  margin: 5px;
`

const StyledHeader = styled.h4`
  background-color: #e0dfdf;
  margin: 0;
  padding: 5px 0;
`

@inject("roomsStore")
@observer
class Rooms extends Component<IRoomProps> {
  public render() {
    const { roomsStore, handleChangeValue } = this.props
    return (
      <FlexContainer>
        {roomsStore!.roomData.map((room: RoomList) => {
          return (
            <StyledRoom key={room.room}>
              <StyledHeader>
                {room.room !== 1 ? (
                  <>
                    <input
                      type="checkbox"
                      checked={room.selected}
                      name={`roomCheck-${room.room}`}
                      id={`roomCheck-${room.room}`}
                      onChange={e =>
                        handleChangeValue(e, room.room, "selected")
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
              <label htmlFor={`adults-${room.room}`}>Adults (18+)</label>
              <select
                name={`adults-${room.room}`}
                id={`adults-${room.room}`}
                value={room.adults}
                onChange={e => handleChangeValue(e, room.room, "adults")}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
              <label htmlFor={`children-${room.room}`}>Children (0-17)</label>
              <select
                name={`children-${room.room}`}
                id={`children-${room.room}`}
                value={room.children}
                onChange={e => handleChangeValue(e, room.room, "children")}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </StyledRoom>
          )
        })}
      </FlexContainer>
    )
  }
}

export default Rooms
