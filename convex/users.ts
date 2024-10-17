import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { auth } from "./auth";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId == null) return;

    return await ctx.db.get(userId);
  },
});
