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
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import { Scrollbar } from "src/components/scrollbar";
SendIcon;
import { getInitials } from "src/utils/get-initials";

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

export const CustomersTable = (props) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [modalData, setModalData] = useState({
        name: "",
    });
    const [open, setOpen] = useState(false);
    const handleOpen = (data) => {
        setModalData(data);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

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
                                <TableCell>Country</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Purchase State</TableCell>
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
                                            <TableCell
                                                onClick={() => {
                                                    handleRowClick(customer.id);
                                                }}
                                            >
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <Avatar src={customer.avatar}>
                                                        {getInitials(customer.name)}
                                                    </Avatar>
                                                    <Typography variant="subtitle2">
                                                        {customer.name}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell
                                                onClick={() => {
                                                    handleRowClick(customer.id);
                                                }}
                                            >
                                                {customer.email}
                                            </TableCell>
                                            <TableCell
                                                onClick={() => {
                                                    handleRowClick(customer.id);
                                                }}
                                            >
                                                {customer.country}
                                            </TableCell>
                                            <TableCell
                                                onClick={() => {
                                                    handleRowClick(customer.id);
                                                }}
                                            >
                                                {customer.context}
                                            </TableCell>
                                            <TableCell
                                                onClick={() => {
                                                    handleRowClick(customer.id);
                                                }}
                                            >
                                                {customer.purchase_state}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="reply"
                                                    size="medium"
                                                    onClick={() => handleOpen(customer)}
                                                >
                                                    <ReplyIcon fontSize="inherit" />
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
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Reply to {modalData.name}
                        </Typography>
                        <Stack spacing={2} style={{ marginTop: "5%" }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="standard"
                            />
                            <Button
                                variant="contained"
                                size="small"
                                endIcon={<SendIcon />}
                                style={{ width: "100px", marginLeft: "auto" }}
                            >
                                Send
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

CustomersTable.propTypes = {
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
