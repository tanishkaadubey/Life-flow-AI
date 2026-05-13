import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

  const fetchTasks = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (!error) {
      setTasks(data);
    }
  };

  fetchTasks();

}, []);

useEffect(() => {

  const channel = supabase
    .channel("tasks-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "tasks",
      },
      async () => {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id);

        setTasks(data || []);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };

}, []);

  // ADD TASK
  const addTask = async (task) => {

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        ...task,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    return;
  }

  setTasks((prev) => [...prev, data[0]]);
};
  // DELETE TASK
  const deleteTask = async (id) => {

    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // UPDATE TASK
  const updateTask = async (id, updates) => {

   const {
  data: { user },
} = await supabase.auth.getUser();

await supabase
  .from("tasks")
  .update(updates)
  .eq("id", id)
  .eq("user_id", user.id);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () =>
  useContext(TaskContext);