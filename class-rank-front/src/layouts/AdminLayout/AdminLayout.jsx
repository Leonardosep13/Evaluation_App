import React from 'react'
import { LoginAdmin } from '../../pages'
import { useAuth } from '../../hooks/useAuth'

export function AdminLayout(props)
 {
    const { children } = props
    const { auth } = useAuth();

    if(!auth) return <LoginAdmin/>;

  return (
    <div>
      <h1>Admin Layout</h1>
      {children}
    </div>
  )
}
