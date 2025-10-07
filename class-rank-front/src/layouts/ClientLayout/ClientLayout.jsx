import React from 'react'

export function ClientLayout(props) {
    
    const { children } = props

  return (
    <div>
        <h1>Client Layout</h1>
        {children}
    </div>
  )
}
