import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

/**
 * Propiedades del componente DeleteConfirmationDialog.
 */
interface DeleteConfirmationDialogProps {
  open: boolean; // Indica si el diálogo está abierto
  onClose: () => void; // Función a ejecutar al cerrar el diálogo
  onConfirm: () => void; // Función a ejecutar al confirmar la eliminación
}

/**
 * Componente DeleteConfirmationDialog.
 * Muestra un diálogo de confirmación para la eliminación de un producto.
 * @param open - Indica si el diálogo está abierto.
 * @param onClose - Función a ejecutar al cerrar el diálogo.
 * @param onConfirm - Función a ejecutar al confirmar la eliminación.
 */
const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Estás seguro de que deseas eliminar este producto?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;