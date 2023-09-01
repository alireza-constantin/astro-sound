import { drizzle } from "drizzle-orm/vercel-postgres";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Create a pgTable that maps to a table in your DB
export const Board = pgTable("board", {
    id: uuid('id').primaryKey(),
    createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const BoardItems = pgTable("board_item", {
	id: uuid("id").primaryKey(),
	url: text("url").unique().notNull(),
	boardId: uuid("board_id").references(() => Board.id),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
});