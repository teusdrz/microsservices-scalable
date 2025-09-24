ALTER TABLE "orders" DROP CONSTRAINT "orders_customerId_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "zip_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "date_of_birth" date;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "customer_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "zipCode";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "dateOfBirth";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "customerId";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "createdAt";