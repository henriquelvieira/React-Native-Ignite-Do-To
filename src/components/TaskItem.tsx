import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task, functionsTasksProps } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

interface TaskItemProps extends functionsTasksProps {
    task: Task;
    index: number;
};

export function TaskItem ({
    task, 
    index, 
    toggleTaskDone, 
    removeTask,
    editTask
}: TaskItemProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState<string>(task.title);

    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
        setIsEditing(true);
    };

    function handleCancelEditing(){
        setTaskNewTitleValue(task.title); //Recover the original value
        setIsEditing(false);
    };

    function handleSubmitEditing(){
        if (editTask({taskId: task.id, taskNewTitle: taskNewTitleValue} )) {
            setIsEditing(false);
        } else {
            handleCancelEditing();
        };


    };

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        };
    }, [isEditing]);

    return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
            >
                <View 
                    testID={`marker-${index}`}
                    style={task.done ? styles.taskMarkerDone : styles.taskMarker }
                >
                    { task.done && (
                        <Icon name="check" size={12} color="#FFF" />
                    )}
                </View>

                <TextInput 
                    ref={textInputRef}
                    editable={isEditing}
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    value={taskNewTitleValue}
                    onChangeText={setTaskNewTitleValue}
                    onSubmitEditing={handleSubmitEditing} //Call when Enter is pressed
                />
                
            </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer }>
            {isEditing ? (
                <TouchableOpacity onPress={handleCancelEditing}>
                    <Icon name="x" size={24} color="#b2b2b2"  />                    
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleStartEditing}>
                    <Image source={editIcon} />                   
                </TouchableOpacity>
            )}

            <View style={ styles.iconsDivider } />

            <TouchableOpacity
                testID={`trash-${index}`}
                onPress={() => removeTask(task.id)}
                disabled={isEditing}
            >
                <Image 
                    source={trashIcon} 
                    style={{ opacity: isEditing ? 0.2 : 1 }}
                />
            </TouchableOpacity>    
        </View>

    </View>        
    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    infoContainer: {
        flex: 1,
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        margin: 12
    }
  })