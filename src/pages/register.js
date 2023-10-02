import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
    Box,
    Button,
    Container,
    Modal,
    Stack,
    SvgIcon,
    TextField,
    Typography,
    InputLabel,
} from "@mui/material";
import FormControl from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { RegisterTable } from "src/sections/register/register-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import toast from "react-hot-toast";

const now = new Date();
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

const useCustomers = (data, page, rowsPerPage) => {
    return useMemo(() => {
        return applyPagination(data, page, rowsPerPage);
    }, [page, rowsPerPage, data]);
};

const useCustomerIds = (customers) => {
    return useMemo(() => {
        return customers.map((customer) => customer.id);
    }, [customers]);
};

const Page = (props) => {
    const [users, setUsers] = useState(props.users);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({
        name: "",
    });
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(users, page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);

    const handlePageChange = useCallback((event, value) => {
        setPage(value);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const handleAdd = async () => {
        try {
            let res = await fetch(`/api/manageadmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, email: email, password: password }),
            });

            if (!res.ok) {
                throw Error(res.statusText);
            }

            const data = await res.json();

            // Now do something with the data...
            toast.success("Success.");
            setUsers([...users, data.data]);
            setOpen(false);
        } catch (error) {
            toast.error("Error occurred.");
            console.error("Error during fetch:", error);
        }
        // setChecked(event.target.checked);
        // setChecked(event.target.checked);
    };

    const handleDelete = (delete_id) => {
        try {
            let res = fetch("/api/manageadmin", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: delete_id }),
            });

            setUsers(users.filter((user) => user._id !== delete_id));
            toast.success("Success.");
        } catch (err) {
            toast.error("Error occurred.");
            console.error("Error on delete:", err);
        }
    };

    const handleReset = (reset_id) => {
        try {
            let res = fetch("/api/manageadmin", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: reset_id }),
            });
            toast.success("Success.");
        } catch (err) {
            toast.error("Error occurred.");
            console.error("Error on reset:", err);
        }
    };

    return (
        <>
            <Head>
                <title>Customers | Devias Kit</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" spacing={4}>
                            <Stack spacing={1}>
                                <Typography variant="h4">Register Admin</Typography>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    }
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    Add
                                </Button>
                            </div>
                        </Stack>
                        <CustomersSearch />
                        <RegisterTable
                            count={users.length}
                            items={customers}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={customersSelection.selected}
                            handleDelete={handleDelete}
                            handleReset={handleReset}
                        />
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
                                        id="fullname_add"
                                        label="Name"
                                        maxRows={4}
                                        variant="standard"
                                        onChange={(e) => setUserName(e.target.value)}
                                    />

                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Email"
                                        maxRows={4}
                                        variant="standard"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <TextField
                                        id="password-input"
                                        label="Password"
                                        maxRows={4}
                                        variant="standard"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <Button
                                        variant="contained"
                                        size="small"
                                        endIcon={<PlusIcon />}
                                        style={{ width: "100px", marginLeft: "auto" }}
                                        onClick={handleAdd}
                                    >
                                        Add
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getServerSideProps(context) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/manageadmin`);
    const users = await res.json();
    return {
        props: { users: users },
    };
}

export const runtime = "edge";
