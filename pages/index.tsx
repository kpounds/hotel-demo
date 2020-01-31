import { NextPage } from "next"
import Link from "next/link"

const Home: NextPage = () => (
  <div>
    <Link href="/about">
      <a>about page</a>
    </Link>
    <p>Hello next.js</p>
  </div>
)

export default Home
