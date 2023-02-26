import React from 'react'
import { baseUrl } from '../../config/api'

const audioPlayerTesst = () => {
  return (
    <div>
      <audio src={baseUrl+'songs/audio/6361677161896025.mp3'}/>
    </div>
  )
}

export default audioPlayerTesst