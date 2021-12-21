import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/editPen/PenEdit.png'

import Icon from 'react-native-vector-icons/Feather';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    item: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TaskItem({ item, toggleTaskDone, removeTask, editTask, index }: TasksListProps) {

    const [editing, setEditing] = useState<boolean>(false);
    const [newTaskTitle, setNewTaskTitle] = useState<string>(item.title);

    const textInputRef = useRef<TextInput>(null)

    const handleStartEditing = () => {
        setEditing(true)
    }

    const handleCancelEditing = () => {
        setEditing(false)
        setNewTaskTitle(item.title)
    }

    const handleSubmitEditing = () => {
        editTask(item.id, newTaskTitle)
        setEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [editing])

    return <ItemWrapper index={index}>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
            >
                <View
                    testID={`marker-${index}`}
                    style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                    {item.done && (
                        <Icon
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                    )}
                </View>

                <TextInput
                    value={newTaskTitle}
                    onChangeText={(value) => setNewTaskTitle(value)}
                    editable={editing}
                    onSubmitEditing={handleSubmitEditing}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />
            </TouchableOpacity>
        </View>

        <View style={styles.iconsContainer} >
            <View>
                <TouchableOpacity
                    onPress={editing ? handleCancelEditing : handleStartEditing}
                >
                    {editing ? <Icon name="x" size={24} color="#b2b2b2" /> : <Image source={editIcon} />}
                </TouchableOpacity>
            </View>
            <View style={{ width: 1, height: 24, backgroundColor: '#c4c4c4' }} />
            <View>
                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ opacity: editing ? 0.2 : 1 }}
                    disabled={editing}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </View>

    </ItemWrapper>

}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
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
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 24
    }
})