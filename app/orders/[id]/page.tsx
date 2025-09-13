import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.serviceOrder.findUnique({
    where: { id: Number(params.id) },
    include: {
      vehicle: {
        include: { customer: true },
      },
      assignedTo: true,
    },
  });

  if (!order) {
    return <main className="p-8">Order not found.</main>;
  }

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <p>{order.description}</p>
      <p>
        <strong>Vehicle:</strong> {order.vehicle.make} {order.vehicle.model} ({order.vehicle.vin})
      </p>
      <p>
        <strong>Customer:</strong> {order.vehicle.customer.name}
      </p>
      <form
        action={`/api/orders/${order.id}/status`}
        method="POST"
        className="space-y-2"
      >
        <label htmlFor="status" className="block">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={order.status}
          className="border p-2"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
        >
          Update
        </button>
      </form>
      <p>
        <Link href="/orders" className="text-blue-600 hover:underline">
          Back to orders
        </Link>
      </p>
    </main>
  );
}

