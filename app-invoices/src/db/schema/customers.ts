import { text, pgTable, date, serial } from 'drizzle-orm/pg-core'



export const invoices = pgTable('invoices', {
            id: serial('id').primaryKey(), // ou uuid('id').primaryKey().defaultRandom()
            name: text().notNull(),
            email: text().notNull().unique(),
            address: text().notNull(),
            state: text().notNull(),
            zipCode: text().notNull(),
            country: text().notNull(),
            dateOfBirth: date({ mode: 'date' }),

})