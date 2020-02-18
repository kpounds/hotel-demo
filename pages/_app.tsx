import App, { AppProps } from "next/app"
import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import { StoreProvider } from "../providers/StoreProvider"

class MainView extends App<AppProps> {
  render() {
    const { Component, pageProps } = this.props
    return (
      <StoreProvider>
        <ToastContainer autoClose={5000} position="bottom-left" />
        <Component {...pageProps} />
      </StoreProvider>
    )
  }
}

export default MainView
