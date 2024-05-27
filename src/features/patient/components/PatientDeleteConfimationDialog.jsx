import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const DeleteConfirmationDialog = ({ open, onClose, onDelete }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs">
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this patient? This action cannot be undone.
            </DialogContent>
            <DialogActions>
                <Button  onClick={onClose} variant="outlined" color="primary">Cancel</Button>
                <Button onClick={onDelete} variant="contained" color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;