import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
type Props = {}

const SearchView = (props: Props) => {
  const params = useParams();

  useEffect(()=>{
    console.log(params)
  },[])

  return (
    <div>SearchView</div>
  )
}

export default SearchView