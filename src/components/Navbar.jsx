import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold">Malyk</Link>
      <div className="space-x-4">
        <Link to="/">Главная</Link>
        <Link to="/admin">Админка</Link>
        {!isLoggedIn && <Link to="/login">Войти</Link>}
      </div>
    </nav>
  );
}
