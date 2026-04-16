"use client";
import { useState, useEffect } from "react";

interface Destination {
  _id: string;
  name: string;
  description: string;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  useEffect(() => {
  const fetchDestinations = async () => {
    const response = await fetch("http://localhost:3001/api/destinations");
    const data = await response.json();
    setDestinations(data);
    console.log(data);
  }

  fetchDestinations();
}, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">Manage Destinations</h1>
      <table className="table-auto w-full border-collapse border border-gray-400">
  <thead>
    <tr>
      <th className="border border-gray-300 p-2">Name</th>
      <th className="border border-gray-300 p-2">Description</th>
      <th className="border border-gray-300 p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    { destinations.map((destination) => (
      <tr key={destination._id}>
        <td className="border border-gray-300 p-2">{destination.name}</td>
      <td className="border border-gray-300 p-2">{destination.description}</td>
      <td className="border border-gray-300 p-2"></td>
      <button className="bg-blue-500 hovering:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Exit
      </button>
      <button className="bg-red-500 hovering:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete
      </button>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}