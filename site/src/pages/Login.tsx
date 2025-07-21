import { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { useNotification } from '../components/NotificationProvider';
import useLogin from '../hooks/user/useLogin';
import heroImage from '../assets/images/hero-image.jpg';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = useLogin();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    
    setLoading(true);
    try {
      await login({ email, password });
      showNotification('Вы успешно вошли!');
      navigate('/account');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Ошибка входа. Проверьте email и пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-layout__form">
        <div style={{ maxWidth: 400, width: '100%' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <h3 className="h3 mb-4 text-center">Вход</h3>
            <div className="mb-3">
              <label htmlFor="login-email">Email:</label>
              <input
                id="login-email"
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                disabled={loading}
                autoComplete="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="login-password">Пароль:</label>
              <div className="position-relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control pr-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 me-2 p-0"
                  tabIndex={-1}
                  style={{ outline: 'none', boxShadow: 'none', transform: 'translateY(-50%)' }}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><circle cx="10" cy="10" r="1.5" fill="#222"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><line x1="4" y1="16" x2="16" y2="4" stroke="#222" strokeWidth="1.2"/></svg>
                  )}
                </button>
              </div>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button black type="submit" disabled={loading} className="w-100">
              Войти
            </Button>
          </form>
          <div className="text-center mt-3">
            <Link to="/register" className="text-dark">
              Нет аккаунта? Зарегистрируйтесь чтобы получить бонусы
            </Link>
          </div>
        </div>
      </div>
      <div
        className="auth-layout__image"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
    </div>
  );
};

export default Login;
