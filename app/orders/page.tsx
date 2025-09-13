import prisma from "@/lib/prisma";

export default async function OrdersPage() {
  const orders = await prisma.serviceOrder.findMany({
    include: {
      vehicle: {
        include: {
          customer: true,
        },
      },
      assignedTo: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Service Orders</h1>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Order</th>
            <th className="py-2">Vehicle</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2">{order.description}</td>
              <td className="py-2">
                {order.vehicle.make} {order.vehicle.model}
              </td>
              <td className="py-2">{order.vehicle.customer.name}</td>
              <td className="py-2">{order.status}</td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td className="py-4 text-center" colSpan={4}>
                No service orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
