import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { login } from '../services/api';
import { replace, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigator = useNavigate()

  const validateField = (name, value) => {
    const errors = {};

    switch (name) {
      case 'username':
        if (!value.trim()) {
          errors.username = 'El usuario es requerido';
        } else if (value.length < 3) {
          errors.username = 'El usuario debe tener al menos 3 caracteres';
        }
        break;
      case 'password':
        if (!value) {
          errors.password = 'La contraseña es requerida';
        } else if (value.length < 4) {
          errors.password = 'La contraseña debe tener al menos 4 caracteres';
        }
        break;
    }

    return errors;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: fieldError[name] || ''
    }));

    if (error) setError("");
  };

  const validateForm = () => {
    const usernameErrors = validateField('username', formData.username);
    const passwordErrors = validateField('password', formData.password);

    const allErrors = { ...usernameErrors, ...passwordErrors };
    setFieldErrors(allErrors);

    return Object.keys(allErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await login(formData)

    if (!response.success) {
      setError(response.error);
    } else {
      setError("");
      alert(`¡Bienvenido ${formData.username}! Redirigiéndote al perfil...`);
      navigator("/profile/me", { replace: true });
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Ingresa a tu cuenta</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Demo:</strong> usuario: "demo", contraseña: "demo123"
              </p>
            </div>
          </div>
        </div>

        <div onSubmit={handleLogin} className="space-y-6">
          {/* Campo Usuario */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="mr-1" />
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${fieldErrors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
            />
            {fieldErrors.username && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {fieldErrors.username}
              </p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Lock size={16} className="mr-1" />
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3 pr-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${fieldErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Recordarme y Olvidé contraseña */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              onClick={() => alert('Función de recuperación de contraseña')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Ingresando...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle size={20} className="mr-2" />
                Iniciar Sesión
              </div>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          {/* Enlaces adicionales */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?
            </p>
            <button
              type="button"
              onClick={() => navigator("/register")}
              className="inline-block w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center"
            >
              Crear cuenta nueva
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Al iniciar sesión, aceptas nuestros{' '}
            <button
              type="button"
              onClick={() => alert('Términos de Servicio')}
              className="text-blue-600 hover:text-blue-500"
            >
              Términos de Servicio
            </button>
            {' '}y{' '}
            <button
              type="button"
              onClick={() => alert('Política de Privacidad')}
              className="text-blue-600 hover:text-blue-500"
            >
              Política de Privacidad
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}