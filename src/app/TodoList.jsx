import PropTypes from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material/";

const TodoList = (props) => {
    const { list, onEdit, onDelete } = props;

    return (
        <Grid container className="todoListContainer">
            {list.length === 0 && (
                <Typography padding={2}>
                    No todos to display.
                </Typography>
            )}
            {list.map((todo) => (
                <Grid
                    item
                    container
                    key={todo.id}
                    direction="column"
                    padding={1}
                    borderBottom={1}
                >
                    <Typography variant="h5" gutterBottom>
                        {todo.title}
                    </Typography>
                    <Typography variant="caption" gutterBottom>Status: {todo.status}</Typography>
                    <Typography variant="subtitle1" color="grey" gutterBottom>{todo.description}</Typography>
                    <Grid>
                        <IconButton
                            color="primary"
                            onClick={() => onEdit(todo.id)}
                            size="small"
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            color="secondary"
                            onClick={() => onDelete(todo.id)}
                            size="small"
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

TodoList.propTypes = {
    list: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export { TodoList };
