import Router from "next/router"

const actionWithPromise = () => new Promise((_, reject) => reject())
// Ignoring the following because this is just for mocking
// @ts-ignore
export const mockRouter = (Router.router = {
  push: actionWithPromise,
  replace: actionWithPromise,
  prefetch: () => {},
  route: "/mock-route",
  pathname: "mock-path"
})
