import React from 'react'
import { LoginAdmin } from '../../pages/Admin/LoginAdmin'

export function AdminLayout(props)
 {
    const { children } = props
    const auth = null

    if(!auth) return <LoginAdmin />;

  return (
    <div>
        <h1>Admin Layout</h1>
        {children}
    </div>
  )
}
