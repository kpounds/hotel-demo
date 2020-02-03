import App, { AppProps } from "next/app"
import React from "react"
import RoomsStore from "../stores/RoomsStore"
import { Provider } from "mobx-react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

class MainView extends App<AppProps> {
  public roomsStore: RoomsStore = new RoomsStore()

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider roomsStore={this.roomsStore}>
        <ToastContainer autoClose={5000} position="bottom-left" />
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MainView
