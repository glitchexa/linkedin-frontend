import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { 
  pgTable, 
  varchar, 
  integer, 
  boolean, 
  timestamp, 
  date, 
  doublePrecision,
  primaryKey,
  uniqueIndex
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  urnId: varchar('urn_id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  location: varchar('location', { length: 255 }),
  alumni: boolean('alumni'),
  lastUpdatedAt: timestamp('last_updated_at')
})

export const company = pgTable('company', {
  id: integer('id').primaryKey(),
  urn: varchar('urn', { length: 50 }).unique(),
  name: varchar('name', { length: 255 })
})

export const jobexp = pgTable('jobexp', {
  personId: varchar('person_id', { length: 50 }).references(() => users.urnId),
  companyId: integer('company_id').references(() => company.id),
  jobTitle: varchar('job_title', { length: 255 }),
  location: varchar('location', { length: 255 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  isCurrent: boolean('is_current')
}, (table) => ({
  pk: primaryKey(table.personId, table.companyId, table.jobTitle, table.startDate)
}))

export const school = pgTable('school', {
  id: integer('id').primaryKey(),
  urn: varchar('urn', { length: 100 }).unique(),
  name: varchar('name', { length: 255 })
})

export const schoolexp = pgTable('schoolexp', {
  personId: varchar('person_id', { length: 50 }).references(() => users.urnId),
  schoolId: integer('school_id').references(() => school.id),
  degree: varchar('degree', { length: 255 }),
  field: varchar('field', { length: 255 }),
  grade: doublePrecision('grade'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  isCurrent: boolean('is_current')
}, (table) => ({
  pk: primaryKey(table.personId, table.schoolId, table.degree)
}))

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export const db = drizzle({client: pool})