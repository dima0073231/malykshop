import { useParams } from 'react-router-dom';

export default function CarDetails({ cars }) {
  const { id } = useParams();
  const car = cars.find(c => c.id === id);

  if (!car) return <div className="p-6">Машина не найдена</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={car.image} alt={car.model} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
      <p className="text-lg mb-2">Год: {car.year}</p>
      <p className="text-lg mb-4">Цена: {car.price}</p>
      <p>{car.description}</p>
    </div>
  );
}
