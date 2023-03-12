import { Link, NavLink } from "react-router-dom"

type Props = {}

const HomeView = (props: Props) => {
  return (
    <>
      <div className="topbar | w-full p-4 flex justify-between">
        <div className="brand">Musicc</div>
        <div className="links | flex">
          <NavLink about="signin" to="/signin">Sign in</NavLink>
        </div>
      </div>
      <div className="content | flex flex-col p-4">
        <div className="flex flex-col items-center">
          <div className="">Welcome to Musicc, discovers new artist, listen to your favorite song and so much more.</div>
          <div className="">Start your journey with us by <Link to="/signup" about="signup">registering</Link> now.</div>
          <button name="home" className="button-main"><Link to="/" about="home" className="text-white">discover now</Link></button>
        </div>
      </div>
    </>
  )
}

export default HomeView