'use client'
import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import {
    Button,
    Grid,
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { deleteTodoById, getTodos } from "@/helper";
import styles from "./page.module.css";

const STATUS = {
    IN_PROGRESS: "In progress",
    DONE: "Done",
    TODO: "Todo",
};

const App = () => {
    const [allTodos, setAllTodos] = useState([]);
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [id, setId] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const onSubmit = () => {
        setAllTodos(getTodos());
        setOpen(false);
    };
    const deleteClose = () => {
        setDeleteOpen(false);
        setId("");
    };
    const onClose = () => {
        setOpen(false);
    };
    const onEdit = (editId) => {
        setId(editId);
        setOpen(true);
    }
    const onDelete = (deleteId) => {
        setId(deleteId);
        setDeleteOpen(true);
    }
    const confirmDelete = () => {
        deleteTodoById(id);
        setDeleteOpen(false);
        setAllTodos(getTodos());
    }
    const handleFilterStatus = (e) => {
        setFilterStatus(e.target.value);
    };

    /**
     * Load all the todos on launch of the app.
     */
    useEffect(() => {
        setAllTodos(getTodos());
    }, []);

    /**
     * Filter out the results
     *  - If any items are added, updated or deleted.
     *  - If the status filters are changed.
     */
    useEffect(() => {
        if (filterStatus) {
            setList(allTodos.filter((item) => item.status === filterStatus));
        } else {
            setList(allTodos);
        }
    }, [allTodos, filterStatus]);

    return (
        <Grid container className="app">
            <Grid item container padding={1}>
                <Button onClick={() => setOpen(true)} variant="contained">
                    Add a Todo
                </Button>
            </Grid>

            <Grid item container>
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-standard-label">Filter by status</InputLabel>
                    <Select
                        value={filterStatus}
                        onChange={handleFilterStatus}
                        label="Filter by status"
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value={STATUS.TODO}>{STATUS.TODO}</MenuItem>
                        <MenuItem value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
                        <MenuItem value={STATUS.DONE}>{STATUS.DONE}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <TodoList
                list={list}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <Modal
                open={open}
                onClose={onClose}
            >
                <Grid className={styles.formOuterWrapper}>
                    <Grid className={styles.formInnerWrapper}>
                        <TodoForm onSubmit={onSubmit} onCancel={onClose} id={id} />
                        <Button className={styles.closeIcon} onClick={onClose}>X</Button>
                    </Grid>
                </Grid>
            </Modal>

            <Dialog
                open={deleteOpen}
                onClose={deleteClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleting a todo will permanently remove it. Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteClose}>Cancel</Button>
                    <Button onClick={confirmDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}

export { App, STATUS };
