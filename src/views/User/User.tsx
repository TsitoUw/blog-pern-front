import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import authService from '../../services/auth.service';
import songService from '../../services/song.service';
import userService from '../../services/user.service';
import { SongMassive } from '../../types/Song';
import SongCard from '../../components/parts/SongCard';


function User() {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(userContext?.currentUser);
  const [isOtherUser, setIsOtherUser] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activeSong, setActiveSong] = useState<'uploaded' | 'favorite'>('uploaded');
  const [songs, setSongs] = useState<Array<SongMassive>>([]);


  const activeSongFilterClass = 'underline underline-offset-2 decoration-emerald-500 decoration-2';

  async function getUsersSong() {
    const res = await songService.get({ user: user?.username });
    setSongs(res)
  }

  async function getAndAssignUser() {
    const current = location.pathname.split('/')[1]
    if (user?.username === current) {
      setUser(userContext?.currentUser)
      setIsFetching(false)
      return
    }

    setIsOtherUser(true);

    let res: any;
    try {
      res = (await userService.getUser(current)).data;
      if (res.user) setUser(res.user)
      setIsFetching(false)
    } catch (error) {
      // handle on user not found
      setIsFetching(false)
      setIsNotFound(true);
      console.log('user not found')
    }
  }

  function signout() {
    authService.signout();
    userContext?.setCurrentUser(null);
    setIsOtherUser(true);
  }

  // useEffect(()=>{
  //   getAndAssignUser()
  //   getUsersSong();
  // },[userContext?.currentUser])

  useEffect(() => {
    getAndAssignUser()
    getUsersSong();
  }, [])

  useEffect(() => {
    // console.log('changed')
  }, [activeSong])

  if (isFetching) {
    return (
      <div className="some-loading">
        Loading...
      </div>
    )
  }

  if (isNotFound) {
    return (
      <div className="not-found">
        Oops, User Not Found
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center">

      <div className='flex flex-col w-full md:w-11/12'>
        <div className="profil md:flex-row flex flex-col w-full gap-6 bg-black  bg-opacity-20 p-4 rounded-b-md">
          <div className="picture md:w-48 w-full h-full flex justify-center items-center">
            <img src="/icon.png" alt="user profile" className='w-48 h-48 object-cover aspect-square rounded-md' draggable={false} />
          </div>
          <div className="info text-xl h-full flex flex-col justify-end items-center md:items-start w-full md:w-3/5">
            <div className="artist-name text-3xl font-medium">{user?.artistname}</div>
            <div className="name text-neutral-400">{user?.name}</div>
          </div>
          {
            !isOtherUser && (
              <div className="action w-full md:w-1/5 flex items-end justify-center gap-5">
                <button className="button-secondary">Edit profil</button>
                <button className="button-main" onClick={signout}>Logout</button>
              </div>
            )
          }
          {
            isOtherUser && (
              <div className="action w-full md:w-1/5 flex items-end justify-center gap-5">
                <button className="button-secondary">Follow</button>
              </div>
            )
          }
        </div>
        <div className="choice | flex gap-4 p-2 text-neutral-400">
          <button className={`uploaded ${activeSong === 'uploaded' ? activeSongFilterClass : ""}`} onClick={(e) => { e.preventDefault(); setActiveSong('uploaded') }}>Uploaded</button>
          <button className={`favorite ${activeSong === 'favorite' ? activeSongFilterClass : ""}`} onClick={(e) => { e.preventDefault(); setActiveSong('favorite') }}>Favorites</button>
        </div>

        {songs.length == 0 && (
          <div className="flex w-full justify-center items-center">No uploaded song.</div>
        )}
        <div className="songs grid grid-flow-row items-center justify-center grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 w-full py-2 gap-4">
          {songs.length > 0 && (
            songs.map((song, index) => {
              return (
                <SongCard song={song} key={index} />
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}

export default User