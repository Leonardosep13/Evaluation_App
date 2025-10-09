import React from 'react'
import { LoginAdmin } from '../../pages/Admin'

export function ClientLayout(props) {
    const { children } = props
    const auth = null

    if (!auth) return <LoginAdmin />

  return (
    <div>
        <h1>Client Layout</h1>
        {children}
    </div>
  )
}
