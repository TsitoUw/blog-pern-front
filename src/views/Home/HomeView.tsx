import { Link, NavLink } from "react-router-dom"

type Props = {}

const HomeView = (props: Props) => {
  return (
    <>
      <div className="topbar | w-full p-4 flex justify-between">
        <div className="brand">Blog</div>
        <div className="links | flex">
          <NavLink to="/login">Sign in</NavLink>
        </div>
      </div>
      <div className="content | flex flex-col p-4">
        <div className="flex justify-around">
          <div className="">Welcome to our blog</div>
          <div className="">Start your journey with us by <Link to="/signup">registering</Link> now.</div>
        </div>
      </div>
    </>
  )
}

export default HomeView