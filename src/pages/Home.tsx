import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask  = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    } as Task;

    setTasks(oldTask => [...oldTask, newTask]);
  };

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    // const updatedTasks = tasks.map(task => (
    //   task.id === id ? task.done = !task.done : task
    // ));

    //TODO - toggle task done if exists
  };

  function handleRemoveTask(id: number) {
    setTasks(oldTask => oldTask.filter( task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})