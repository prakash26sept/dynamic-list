import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import fire from '../configuration/config';

function useTodo() {
    const [todo, setTodo] = useState([])

    useEffect(() => {
        fire.firestore().collection('todos').onSnapshot((snapshot) => {
            const newTodo = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setTodo(newTodo);
        })
    }, [])
    return todo
}

export default function TodoTable() {

    const todos = useTodo();
    console.log(todos);
    const [state] = React.useState({
        columns: [
            {
                title: 'Title', field: 'title', headerStyle: {
                    backgroundColor: '#eaeaea', fontSize: '20px'
                }
            },
            {
                title: 'Description', field: 'description', searchable: false, headerStyle: {
                    backgroundColor: '#eaeaea', fontSize: '20px'
                }
            },

        ],
        data: todos,
    });

    return (
        <MaterialTable
            title="Todo List"
            columns={state.columns}
            data={todos}
        />
    );
}
