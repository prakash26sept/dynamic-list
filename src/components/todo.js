import React, { useState } from 'react';
//import logo from './logo.svg';
// import './App.css';
// import Navigation from './navigation/navigation';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import TodoBox from './todoBox';
import fire from '../configuration/config';
// import { useParams } from "react-router-dom";
import TodoTable from './todoTable';

import { makeStyles, createStyles } from '@material-ui/core';

const style = makeStyles(theme => createStyles({
    '@global': {
    },

    main: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '50px',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 30px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        border: '5px solid #eaeaea',
        borderRadius: '5px',
        justifyContent: 'space-around'
    },
    chatDiv: {
        marginTop: '20px',
        color: 'purple',
        '&>div': {
            margin: '10px',

        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius: '10px',
        boxShadow: theme.shadows[1],
        // padding: theme.spacing(2, 4, 3),
        outline: 'none',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '70%'
        }, padding: '50px',
    },
    center: {
        display: 'flex',
        marginTop: '20px',
        justifyContent: 'center',
        padding: '5px 15px',
        borderRadius: '5px',
        margin: 'auto',
        backgroundColor: 'black',
        color: 'white',
        width: '132px',
        height: '32px',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    openModal: {
        // border: '1px solid black',
        padding: '10px',
        borderRadius: '5px'
    },
    chatImg: {
        width: '50%',
        borderRadius: '5px',
        border: '2px solid grey'
        // margin: 'auto'
    },
    chatImgDiv: {
        width: '70%',
        borderRadius: '5px'
    },
    heading: {
        width: '50%',
        margin: 'auto',
        textAlign: 'center'
    },
    userid: {
        color: 'purple'
    },
    addModal: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        '&>div': {
            margin: '10px 0'
        }
    },
    headingModal: {
        textAlign: 'center',
        padding: '30px 0',
        fontSize: '19px'
    },
    addTodo: {
        backgroundColor: 'black',
        color: 'white',
        padding: '5px 15px',
        width: '80px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '10px',
        borderRadius: '6px',
        '&:hover': {
            cursor: 'pointer'
        }

    },
    mainInside: {
        width: '90%'
    },
    input: {
        padding: '10px',
        width: '90%',
        fontSize: '18px',
        // border: 'none',
        backgroundColor: 'transparent'
    }
}));

function Todo() {

    const classes = style();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleOpen = () => {
        setOpen(true);
        console.log('Called')
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addTodo = () => {
        fire.firestore().collection('todos').add({
            title,
            description
        })
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.headingModal}>Enter title and description to Add todo</div>
                        <div className={classes.addModal}>
                            <div><input placeholder="Title" className={classes.input} value={title} onChange={e => setTitle(e.currentTarget.value)} type="text" /></div>
                            <div><input placeholder="Description" value={description} className={classes.input} onChange={e => setDescription(e.currentTarget.value)} type="text" /></div>
                        </div>
                        <div className={classes.addTodo} onClick={addTodo}>Add Todo</div>
                    </div>
                </Fade>
            </Modal>
            <div className={classes.heading}><h2>Welcome to Firebase ToDo List</h2>
                <div className={classes.userid}></div></div>

            <div className={classes.main}>

                <div className={classes.mainInside}>

                    <div className={classes.chatDiv}>
                        <div><img src="list.png" alt="todo" /></div>
                        <div className={classes.openModal} ><div onClick={handleOpen} className={classes.center}>ADD TASK</div></div>
                        {/* <div className={classes.openModal} >Name: Naman<div onClick={handleOpen} className={classes.center}>Start Chatting</div></div> */}
                    </div>
                    {/* <TodoBox /> */}
                    <TodoTable />
                </div>

            </div>



        </React.Fragment>
    );
}

export default Todo;