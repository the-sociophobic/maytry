import { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { useNotification } from '../components/NotificationProvider';
import useRegister from '../hooks/user/useRegister';
import heroImage from '../assets/images/hero-image.jpg';

const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const register = useRegister();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleRegister = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }
    if (!agreedToPolicy) {
      setError('Необходимо согласиться с политикой конфиденциальности.');
      return;
    }
    
    setLoading(true);
    try {
      await register({ email, password });
      showNotification('Вы успешно зарегистрировались!');
      navigate('/account');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Ошибка регистрации. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-layout__form">
        <div style={{ maxWidth: 400, width: '100%' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <h3 className="h3 mb-4 text-center">Регистрация</h3>
            <div className="mb-3">
              <label htmlFor="register-email">Email:</label>
              <input
                id="register-email"
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
              <label htmlFor="register-password">Пароль:</label>
              <div className="position-relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control pr-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  disabled={loading}
                  autoComplete="new-password"
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
            <div className="mb-3">
              <label htmlFor="register-confirm-password">Повторите пароль:</label>
              <div className="position-relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm-password"
                  className="form-control pr-5"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 me-2 p-0"
                  tabIndex={-1}
                  style={{ outline: 'none', boxShadow: 'none', transform: 'translateY(-50%)' }}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><circle cx="10" cy="10" r="1.5" fill="#222"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><line x1="4" y1="16" x2="16" y2="4" stroke="#222" strokeWidth="1.2"/></svg>
                  )}
                </button>
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="privacyPolicyCheck"
                checked={agreedToPolicy}
                onChange={(e) => setAgreedToPolicy(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="privacyPolicyCheck">
                Я согласен с <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-dark">политикой конфиденциальности</Link>
              </label>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button black type="submit" disabled={loading || !agreedToPolicy} className="w-100">
              Зарегистрироваться
            </Button>
          </form>
          <div className="text-center mt-3">
            <Link to="/login" className="text-dark">
              Уже есть аккаунт? Войти
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

export default Register;
