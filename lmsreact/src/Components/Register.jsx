// src/Components/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../Services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, roles: 'USER' };
      const response = await authService.register(payload);
      alert(response.data);
      navigate('/login');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title text-center">User Registration</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Username is required' })}
            />
            {errors.name && (<div className="invalid-feedback">{errors.name.message}</div>)}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters required' } })}
            />
            {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits' }
              })}
            />
            {errors.phone && (<div className="invalid-feedback">{errors.phone.message}</div>)}
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
