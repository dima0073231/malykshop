import { Link } from 'react-router-dom';

export default function Home({ cars }) {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cars.map(car => (
        <Link to={`/car/${car.id}`} key={car.id} className="border rounded-xl shadow p-4 hover:shadow-lg">
          <img src={car.image} alt={car.model} className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
          <p>{car.year} — {car.price}</p>
        </Link>
      ))}
    </div>
  );
}
