import { UserButton } from "@clerk/nextjs";
import { TodoList } from "./_components/TodoList";

export default function Home() {
  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
      <div>Hello</div>
      <TodoList />
    </main>
  );
}
