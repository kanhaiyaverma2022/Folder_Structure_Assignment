import React from 'react'

const Icon = ({icon,rotate,props}) => {
  return (
    <div>
      <img src={icon} alt='icon' className={`w-4 h-4 ${rotate ? "-rotate-90" : ""} ${props}`}/>
    </div>
  )
}

export default Icon
