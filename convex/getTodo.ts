import { query } from "./_generated/server";
import { v } from "convex/values";

export const getTodo = query({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    return todo;
  },
});

