import React from 'react'
import { HashLoader } from 'react-spinners'

interface Props {
  size?: string
}

export default function Loading({ size }: Props) {
  return (
    <div className='p-3'>
      <HashLoader size={size||'35px'} loading={true} color='#6D28D9'></HashLoader>
    </div>
  )
}
