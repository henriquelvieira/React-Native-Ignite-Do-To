import React, { useState } from 'react';
import { StyleSheet, View, Alert  } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskProps {
  taskId: number; 
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function validateIfTitleAlreadyExists(newTaskTitle: string): boolean {
    const taskWithSameTitle = tasks.filter(task => task.title === newTaskTitle);
    console.log(taskWithSameTitle);
    
    if (taskWithSameTitle.length > 0) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return true
    } else {
      return false
    };
  };

  function handleAddTask(newTaskTitle: string) {

    if (validateIfTitleAlreadyExists(newTaskTitle)) {
      return;
    } else {

      const newTask  = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      } as Task;

      setTasks(oldTask => [...oldTask, newTask]);
    }
  };

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => (
      {
        id: task.id, 
        title: task.title, 
        done: task.id === id ? !task.done : task.done
      } 
    ));

    setTasks(updatedTasks);
  };

  function handleRemoveTask(id: number) {

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
                [
                  {
                    text: 'Não',
                    style: 'cancel',
                  },
                  { 
                    text: 'Sim', 
                    onPress: () => setTasks(oldTask => oldTask.filter( task => task.id !== id)) 
                  }
                ]
                );    
    
  };

  function handleEditTask({ taskId, taskNewTitle } : EditTaskProps ): Boolean {
    
    if (validateIfTitleAlreadyExists(taskNewTitle)) {
      return false;
    } else {
      const updatedTasks = tasks.map(task => (
        {
          id: task.id, 
          title: task.id === taskId ? taskNewTitle : task.title, 
          done: task.done
        } 
      ));

      setTasks(updatedTasks);
      return true;
    }
    
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
});