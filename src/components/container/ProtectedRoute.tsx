import { ReactElement, useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({child,reversed}:{child:ReactElement,reversed?:boolean}) => {
  const location = useLocation()
  const user = useContext(UserContext)
  if(user?.currentUser == null && !reversed) return <Navigate to="/welcome" state={{ from: location}} replace />
  if(user?.currentUser !== null && reversed) return <Navigate to="/" state={{ from: location}} replace />
  return child
}

export default ProtectedRoute