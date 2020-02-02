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

interface IRoomContainerProps {
  disabled: boolean
}

const FlexContainer = styled.div`
  display: flex;
`

const StyledRoom = styled.div`
  max-width: 190px;
  border: 2px solid
    ${(props: IRoomContainerProps) => (props.disabled ? "#a0afba" : "#e0dfdf")};
  border-radius: 5px;
  margin: 5px;
  ${(props: IRoomContainerProps) =>
    props.disabled ? "background-color: #d1d8de" : ""}
`

const StyledHeader = styled.h4`
  display: flex;
  align-items: center;
  background-color: ${(props: IRoomContainerProps) =>
    props.disabled ? "" : "#e0dfdf"};
  margin: 0;
  padding: 5px;
  font-size: 0.9em;
`

const SelectContainer = styled.div`
  padding: 10px 10px 15px;
  max-width: 80px;
`

const SelectLabel = styled.label`
  font-size: 0.8em;
  display: block;
  padding-bottom: 4px;
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
            <StyledRoom disabled={!room.selected} key={room.room}>
              <StyledHeader disabled={!room.selected}>
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
              <FlexContainer>
                <SelectContainer>
                  <SelectLabel htmlFor={`adults-${room.room}`}>
                    Adults
                    <br />
                    (18+)
                  </SelectLabel>
                  <select
                    name={`adults-${room.room}`}
                    id={`adults-${room.room}`}
                    value={room.adults}
                    disabled={!room.selected}
                    onChange={e => handleChangeValue(e, room.room, "adults")}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </SelectContainer>
                <SelectContainer>
                  <SelectLabel htmlFor={`children-${room.room}`}>
                    Children
                    <br />
                    (0-17)
                  </SelectLabel>
                  <select
                    name={`children-${room.room}`}
                    id={`children-${room.room}`}
                    value={room.children}
                    disabled={!room.selected}
                    onChange={e => handleChangeValue(e, room.room, "children")}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </SelectContainer>
              </FlexContainer>
            </StyledRoom>
          )
        })}
      </FlexContainer>
    )
  }
}

export default Rooms
