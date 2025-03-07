import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../Services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const authRequest = { username: data.username, password: data.password };
      const tokenResponse = await authService.login(authRequest);
      const token = tokenResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', data.username);

      const userResponse = await authService.getUserDetails(data.username);
      const userObj = userResponse.data;
      if (userObj && userObj.id) {
        localStorage.setItem('userId', userObj.id);
      } else {
        alert('User details not found.');
        return;
      }
      localStorage.setItem('userRole', userObj.roles || 'USER');
      navigate('/books');
    } catch (error) {
      alert('User Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title text-center">User Login</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
