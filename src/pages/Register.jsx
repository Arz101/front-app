import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, Lock } from 'lucide-react';

export default function ImprovedRegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    birthday: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'El apellido es requerido';
    } else if (formData.lastname.length < 2) {
      newErrors.lastname = 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar username
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Solo se permiten letras, números y guiones bajos';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Debe contener mayúsculas, minúsculas y números';
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar teléfono
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Ingresa un número de teléfono válido';
    }

    // Validar fecha de nacimiento
    if (!formData.birthday) {
      newErrors.birthday = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        newErrors.birthday = 'Debes tener al menos 13 años';
      }
    }

    // Validar género
    if (!formData.gender) {
      newErrors.gender = 'Selecciona tu género';
    }

    return newErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío de formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Datos del formulario:', formData);
      alert('¡Registro exitoso!');
    } catch (error) {
      setErrors({ submit: 'Error al procesar el registro. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 4) return { level: 0, text: '', color: '' };
    if (password.length < 8) return { level: 1, text: 'Débil', color: 'text-red-500' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { level: 2, text: 'Regular', color: 'text-yellow-500' };
    }
    return { level: 3, text: 'Fuerte', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
          <p className="text-gray-600">Completa todos los campos para registrarte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="mr-1" />
                Nombre *
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
              <input
                type="text"
                placeholder="Tu apellido"
                value={formData.lastname}
                onChange={(e) => handleInputChange('lastname', e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastname ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.lastname && (
                <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de usuario *</label>
              <input
                type="text"
                placeholder="usuario123"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="mr-1" />
                Email *
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Lock size={16} className="mr-1" />
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña segura"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-1">
                  <span className={`text-xs ${passwordStrength.color}`}>
                    Fortaleza: {passwordStrength.text}
                  </span>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="mr-1" />
                Teléfono *
              </label>
              <input
                type="tel"
                placeholder="+503 1234-5678"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="mr-1" />
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)}
                disabled={isSubmitting}
                max={new Date(Date.now() - 13 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.birthday ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.birthday && (
                <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Género *</label>
            <div className="grid grid-cols-3 gap-4">
              <div className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${formData.gender === 'M' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`} onClick={() => handleInputChange('gender', 'M')}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={formData.gender === "M"}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={isSubmitting}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Masculino</span>
                </div>
              </div>

              <div className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${formData.gender === 'F' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`} onClick={() => handleInputChange('gender', 'F')}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={formData.gender === "F"}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={isSubmitting}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Femenino</span>
                </div>
              </div>

              <div className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${formData.gender === 'O' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`} onClick={() => handleInputChange('gender', 'O')}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="O"
                    checked={formData.gender === "O"}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={isSubmitting}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Otro</span>
                </div>
              </div>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          <div className="w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Registrando...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?
              <a href="/" className="text-blue-600 hover:text-blue-500 ml-1">
                Iniciar sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}