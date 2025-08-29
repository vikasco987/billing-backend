export default function ViewMenuPage() {
  const menus = [
    { id: 1, name: "Breakfast Menu", items: 12 },
    { id: 2, name: "Lunch Menu", items: 8 },
    { id: 3, name: "Dinner Menu", items: 10 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">View Menu</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Menu Name</th>
            <th className="border p-2 text-left">Items</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td className="border p-2">{menu.id}</td>
              <td className="border p-2">{menu.name}</td>
              <td className="border p-2">{menu.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
