// src/server/router/index.ts
import superjson from "superjson";
import postRouter from "@/server/router/posts";
import commentRouter from "@/server/router/comment";
import userRouter from "@/server/router/user";
import searchRouter from "@/server/router/search";
import notificationRouter from "@/server/router/notification";
import { createRouter } from "./context";

//creating connection with trpc & router

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("comment.", commentRouter)
  .merge("user.", userRouter)
  .merge("search.", searchRouter)
  .merge("notification.", notificationRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
