import React, { useState } from 'react'
import { loginApi } from '../../api/user'
import { useAuth } from '../../hooks/useAuth'
import './LoginForm.css'

export function LoginForm() {
  const [formData, setFormData] = useState({
    email_teacher: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    await loginApi(formData);
    await login();
  } catch (error) {
    setError("Error al iniciar sesión: usuario o contraseña incorrectos");
    console.error("Error en handleSubmit:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Iniciar Sesión</h1>
          <p className="login-subtitle">Ingresa tus credenciales para acceder al panel de administración</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="alert alert-danger mb-3">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email_teacher" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control custom-input"
              id="email_teacher"
              name="email_teacher"
              value={formData.email_teacher}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control custom-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Recordar mi sesión
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn custom-btn-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <div className="text-center">
            <a href="#" className="forgot-password-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}