import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function NewOrderPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { customer: true },
    orderBy: { id: "desc" },
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Service Order</h1>
      <form
        action="/api/orders"
        method="POST"
        className="space-y-4 max-w-md"
      >
        <div>
          <label htmlFor="vehicleId" className="block mb-1">
            Vehicle
          </label>
          <select
            id="vehicleId"
            name="vehicleId"
            className="border p-2 w-full"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select vehicle
            </option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.make} {v.model} ({v.vin}) — {v.customer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
        >
          Create
        </button>
      </form>
      <p className="mt-4">
        <Link href="/orders" className="text-blue-600 hover:underline">
          Back to orders
        </Link>
      </p>
    </main>
  );
}
