import { useState } from 'react';

export default function Admin({ cars, setCars, isLoggedIn }) {
  const [newCar, setNewCar] = useState({
    id: '', brand: '', model: '', year: '', price: '', image: '', description: ''
  });

  const handleAdd = () => {
    if (newCar.id && newCar.brand) {
      setCars([...cars, newCar]);
      setNewCar({ id: '', brand: '', model: '', price: '', image: '', description: '' });
    } else {
      alert('Пожалуйста, заполните ID и бренд');
    }
  };

  const handleDelete = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleDescriptionChange = (id, description) => {
    setCars(
      cars.map(car =>
        car.id === id ? { ...car, description } : car
      )
    );
  };

  if (!isLoggedIn) return <div className="p-6">Доступ запрещён</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Админ-панель</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.keys(newCar).map(key => (
          <input
            key={key}
            className="border p-2 rounded"
            placeholder={key}
            value={newCar[key]}
            onChange={e => setNewCar({ ...newCar, [key]: e.target.value })}
          />
        ))}
      </div>
      <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded mb-6">Добавить товар</button>

      <h3 className="text-xl font-semibold mb-2">Текущий ассортимент</h3>
      <ul>
        {cars.map(car => (
          <li key={car.id} className="border-b py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{car.brand} {car.model}</span>
              <button onClick={() => handleDelete(car.id)} className="text-red-600">Удалить</button>
            </div>
            <textarea
              className="mt-2 w-full border rounded p-2 text-sm"
              value={car.description}
              onChange={e => handleDescriptionChange(car.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
