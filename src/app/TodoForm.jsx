import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Box, TextField, FormControl, MenuItem, Select, Button, Typography } from "@mui/material";
import { STATUS } from "./App";
import { addTodo, getTodoById, updateTodoById } from "@/helper";

const TodoForm = (props) => {
    const { id, onSubmit: parentOnSubmit, onCancel: parentOnCancel } = props;
    const [todoStatus, setTodoStatus] = useState(STATUS.TODO);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const handleTodoStatusChange = (e) => {
        setTodoStatus(e.target.value);
    };

    const resetForm = () => {
        setTodoStatus(STATUS.TODO);
        setTitle("");
        setDescription("");
        setIsSubmit(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        if (title && description) {
            const newTodo = {
                id: id || Date.now(),
                title,
                description,
                status: todoStatus,
            }
            if (id) {
                updateTodoById(id, newTodo);
            } else {
                addTodo(newTodo);
            }
            if (parentOnSubmit) {
                parentOnSubmit(newTodo);
            }
            resetForm();
        }
    };

    const onCancel = () => {
        resetForm();
        if (parentOnCancel) {
            parentOnCancel();
        }
    }

    useEffect(() => {
        if (id) {
            const existingTodo = getTodoById(id);
            setTitle(existingTodo.title);
            setDescription(existingTodo.description);
            setTodoStatus(existingTodo.status);
        }
    }, [id]);

    const isTitleError = isSubmit && !title;
    const isDescriptionErorr = isSubmit && !description;
    const formHeader = id ? "Update todo" : "Add todo";

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <Typography variant="h4">
                {formHeader}
            </Typography>
            <div>
                <TextField
                    required
                    error={isTitleError}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    label="Title"
                    placeholder="Please add title"
                    helperText={isTitleError ? "Title is required" : ""}
                    value={title}
                />
            </div>
            <div>
                <TextField
                    required
                    error={isDescriptionErorr}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    label="Description"
                    placeholder="Please add description"
                    helperText={isDescriptionErorr ? "Description is required" : ""}
                    value={description}
                />
            </div>
            <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={todoStatus}
                        onChange={handleTodoStatusChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={STATUS.TODO}>{STATUS.TODO}</MenuItem>
                        <MenuItem value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
                        <MenuItem value={STATUS.DONE}>{STATUS.DONE}</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button type="submit" onClick={onSubmit}>
                    {id ? "Update" : "Submit"}
                </Button>
                <Button type="submit" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </Box>
    )

}

export { TodoForm };

TodoForm.propTypes = {
    id: propTypes.number,
    onSubmit: propTypes.func,
    onCancel: propTypes.func,
};
