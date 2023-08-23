"use client";
import { FC } from "react";
import { trpc } from "../_trpc/client";

export const TodoList: FC = () => {
  const getTodos = trpc.getTodos.useQuery();
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {getTodos.data?.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};
