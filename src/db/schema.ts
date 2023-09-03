import { drizzle } from "drizzle-orm/vercel-postgres";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from 'uuid'
import { sql,  } from "@vercel/postgres";
import type { InferSelectModel } from 'drizzle-orm'

// Create a pgTable that maps to a table in your DB
export const boards = pgTable("board", {
    id: uuid('id').primaryKey().$default(() => uuidv4()),
	name: text('name').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const sounds = pgTable("sound", {
	id: uuid("id").primaryKey().$default(() => uuidv4()),
	url: text("url").notNull(),
	boardId: uuid("board_id").references(() => boards.id),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const db = drizzle(sql)

export type Board = InferSelectModel<typeof boards>
export type Sound = InferSelectModel<typeof sounds>