import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    completed: v.boolean(),
    createdAt: v.number(),
    order: v.number(),
  })
    .index("by_created", ["createdAt"])
    .index("by_completed", ["completed"])
    .index("by_order", ["order"]),
});

