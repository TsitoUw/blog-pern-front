import { Link } from 'react-router-dom'
import authService from '../../services/auth.service'
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';

const FeedsView = () => {
  const user = useContext(UserContext);

  function signout(){
    authService.signout();
    user?.setCurrentUser(null)
  }

  function test(){
    authService.test();
  }
  return (
    <div className='flex flex-col'>
      {user?.currentUser && <p>Welcome {user?.currentUser?.artistname}</p>}
      <Link to="/signin"> login</Link>
      <Link to="/uaaa/upload"> upload</Link>
      <button onClick={signout}> logout </button>
      <button onClick={test}> test </button>
      
    </div>
  )
}

export default FeedsView