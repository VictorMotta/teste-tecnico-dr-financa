import  { connectDb, prisma }  from  '../src/shared/configs';
import {fa, faker} from "@faker-js/faker";




async function main() {
  connectDb();
  let invoice = await prisma.invoice.findFirst();
  if (!invoice) {
    invoice = await prisma.invoice.create({
      data: {
      cnpjCustomer: faker.string.numeric(11),
      municipality: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      serviceValue: faker.number.float({ min: 1000, max: 10000 }),
      desiredIssueDate: faker.date.soon(),
      description: faker.lorem.sentence(),
      status: 'EMITIDA',
      numberNF: faker.string.numeric(8),
      emissionDate: faker.date.soon(),
      },
    });
  }
  console.log('Seeded invoice:', invoice);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });