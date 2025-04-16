import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin') {
      setIsLoggedIn(true);
      navigate('/admin');
    } else {
      alert('Неверный пароль');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Вход в админку</h2>
      <input
        type="password"
        className="border p-2 w-full mb-4 rounded"
        placeholder="Введите пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Войти
      </button>
    </div>
  );
}
