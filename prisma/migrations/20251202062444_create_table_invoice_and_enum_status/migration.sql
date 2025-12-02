-- CreateEnum
CREATE TYPE "status_invoice" AS ENUM ('PENDENTE_EMISSAO', 'EMITIDA', 'CANCELADA');

-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "cnpj_customer" VARCHAR(14) NOT NULL,
    "municipality" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "service_value" DECIMAL(10,2) NOT NULL,
    "desired_issue_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "status_invoice" NOT NULL DEFAULT 'PENDENTE_EMISSAO',
    "number_nf" TEXT,
    "emission_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);
