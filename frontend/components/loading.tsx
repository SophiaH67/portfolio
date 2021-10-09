import React from 'react'
import { HashLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className="p-3">
      <HashLoader size="35px" loading={true} color='#6D28D9'></HashLoader>
    </div>
  )
}
