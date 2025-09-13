
const { PrismaClient } = require("@prisma/client");
=======

const { PrismaClient } = require("@prisma/client");
=======

const { PrismaClient } = require("@prisma/client");
=======


const prisma = new PrismaClient();

async function main() {
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      phone: "555-1234",
      vehicles: {
        create: [{
          vin: "1A4AABBC5KD123456",
          make: "Toyota",
          model: "Camry",
          year: 2010,
          serviceOrders: {
            create: [{ description: "Oil change" }],
          },
        }],
      },
    },
  });
  console.log(`Seeded customer with id ${customer.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
