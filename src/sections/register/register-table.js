import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Modal,
    Collapse,
    TextField,
    Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Scrollbar } from "src/components/scrollbar";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

export const RegisterTable = (props) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [reset_modalData, setResetModalData] = useState({
        name: "",
    });
    const [delete_modalData, setDeleteModalData] = useState({
        name: "",
    });
    const [reset_open, setResetOpen] = useState(false);
    const [delete_open, setDeleteOpen] = useState(false);

    const handleResetOpen = (data) => {
        setResetModalData(data);
        setResetOpen(true);
    };
    const handleResetClose = () => setResetOpen(false);
    const handleDeleteOpen = (data) => {
        setDeleteModalData(data);
        setDeleteOpen(true);
    };
    const handleDeleteClose = () => setDeleteOpen(false);
    const handleRowClick = (rowId) => {
        if (rowId === expandedRow) {
            setExpandedRow(null);
        } else {
            setExpandedRow(rowId);
        }
    };

    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => {},
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
    } = props;

    const selectedSome = selected.length > 0 && selected.length < items.length;
    const selectedAll = items.length > 0 && selected.length === items.length;

    return (
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow className="">
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAll}
                                        indeterminate={selectedSome}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                onSelectAll?.();
                                            } else {
                                                onDeselectAll?.();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((customer) => {
                                const isSelected = selected.includes(customer.id);
                                // const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                                return (
                                    <React.Fragment key={customer.id}>
                                        <TableRow hover key={customer.id} selected={isSelected}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(event) => {
                                                        if (event.target.checked) {
                                                            onSelectOne?.(customer.id);
                                                        } else {
                                                            onDeselectOne?.(customer.id);
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <Typography variant="subtitle2">
                                                        {customer.username}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            {/* <TableCell>{customer.address.country}</TableCell> */}
                                            {/* <TableCell
                        onClick={() => {
                          handleRowClick(customer.id);
                        }}
                      >
                        {customer.message}
                      </TableCell> */}
                                            <TableCell>
                                                <IconButton
                                                    aria-label="trash"
                                                    size="medium"
                                                    onClick={() => handleResetOpen(customer)}
                                                >
                                                    <LockResetIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="delete"
                                                    size="medium"
                                                    onClick={() => handleDeleteOpen(customer)}
                                                >
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                style={{
                                                    paddingBottom: 0,
                                                    paddingTop: 0,
                                                }}
                                            >
                                                <Collapse
                                                    in={expandedRow === customer.id}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <Typography>row.childData</Typography>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <Modal
                    open={reset_open}
                    onClose={handleResetClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            textAlign={"center"}
                        >
                            Do you want to reset password?
                        </Typography>
                        <Stack spacing={2} style={{ marginTop: "10%" }} direction={"row"}>
                            <Button
                                variant="contained"
                                size="small"
                                color="error"
                                style={{
                                    width: "100px",
                                    margin: "auto",
                                }}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                style={{ width: "100px", margin: "auto" }}
                                onClick={handleResetClose}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
                <Modal
                    open={delete_open}
                    onClose={handleDeleteClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            textAlign={"center"}
                        >
                            Do you want to delete account?
                        </Typography>
                        <Stack spacing={2} style={{ marginTop: "10%" }} direction={"row"}>
                            <Button
                                variant="contained"
                                size="small"
                                color="error"
                                style={{
                                    width: "100px",
                                    margin: "auto",
                                }}
                                onClick={handleResetClose}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                style={{ width: "100px", margin: "auto" }}
                                onClick={handleDeleteClose}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

RegisterTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
