"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Test = () => {
  const tasks = useQuery(api.tasks.get);
  if (tasks === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
    </main>
  );
};

export default Test;
