import React from 'react';
import { FlatList } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';
import { EditTaskProps } from './../pages/Home';

export interface Task {
  id: number;
  title: string;
  done: boolean;
};

export interface functionsTasksProps {
  toggleTaskDone: (id: number) => void;
  editTask: ({ taskId, taskNewTitle } : EditTaskProps) => Boolean;
  removeTask: (id: number) => void;
};

interface TasksListProps extends functionsTasksProps {
  tasks: Task[]
};

export function TasksList({ 
  tasks, 
  toggleTaskDone, 
  removeTask, 
  editTask 
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
      style={{ marginTop: 32}}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              task={item} 
              index={index} 
              toggleTaskDone={toggleTaskDone}
              editTask={editTask}
              removeTask={removeTask}
            />
          </ItemWrapper>
        )
      }}
    />
  )
};