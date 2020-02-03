import styled from "styled-components"

interface IRoomContainerProps {
  disabled: boolean
}

export const FlexContainer = styled.div`
  display: flex;
`

export const StyledRoom = styled.div`
  max-width: 190px;
  border: 2px solid
    ${(props: IRoomContainerProps) => (props.disabled ? "#a0afba" : "#e0dfdf")};
  border-radius: 5px;
  margin: 5px;
  ${(props: IRoomContainerProps) =>
    props.disabled ? "background-color: #d1d8de" : ""}
`

export const StyledHeader = styled.h4`
  display: flex;
  align-items: center;
  background-color: ${(props: IRoomContainerProps) =>
    props.disabled ? "" : "#e0dfdf"};
  margin: 0;
  padding: 5px;
  font-size: 0.9em;
`

export const SelectContainer = styled.div`
  padding: 10px 10px 15px;
  max-width: 80px;
`

export const SelectLabel = styled.label`
  font-size: 0.8em;
  display: block;
  padding-bottom: 4px;
`
