import { valueToNode } from '@babel/types';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(e => e.title === newTaskTitle)){
      Alert.alert("Task já cadastrada",'Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    updatedTasks.forEach(element => {
      if (element.id == id) {
        element.done = !element.done
      }
    })
    setTasks(updatedTasks)
  }
  

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Tem certeza que você deseja remover esse item?",
      "",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim", onPress: () => setTasks(tasks.filter(task => task.id !== id)) }
      ]
    );
    
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    updatedTasks.forEach(element => {
      if (element.id == taskId) {
        element.title = taskNewTitle
      }
    })
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        editTask={handleEditTask}
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