import React from "react"
import ReactDOM from "react-dom"
import MainView from "../_app"
import { mockRouter } from "../../mock/mockNextRouter"

const MockComponent = () => {
  return <div>Test component to render</div>
}
const mockPageProps = {}

describe("Home page", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(
      <MainView
        Component={MockComponent}
        pageProps={mockPageProps}
        // @ts-ignore
        router={mockRouter}
      />,
      div
    )
  })
})
