import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { LicenseTable } from "src/sections/license/license-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";

const now = new Date();

const label = { inputProps: { "aria-label": "Switch demo" } };

const useCustomers = (customer_data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(customer_data, page, rowsPerPage);
  }, [page, rowsPerPage, customer_data]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = (props) => {
  const [page, setPage] = useState(0);
  // const [checked, setChecked] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(props.customers, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const handleChange = async (event) => {
    console.log(event.target.checked);
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: event.target.checked }),
      });

      if (!res.ok) {
        throw Error(res.statusText);
      }

      const data = await res.json();

      // Now do something with the data...
      console.log(data);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
    // setChecked(event.target.checked);
    // setChecked(event.target.checked);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

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
                <Typography variant="h4">Customers</Typography>
              </Stack>
              <div>
                <FormControlLabel
                  control={<Switch defaultChecked={props.auto_reply} onChange={handleChange} />}
                  label="Auto Reply"
                />
              </div>
            </Stack>
            <CustomersSearch />
            <LicenseTable
              count={props.customers.length}
              items={props.customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getServerSideProps(context) {
  let res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/pay`);
  const customers = await res.json();
  res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/config`);
  const auto_reply = await res.json();
  return {
    props: { customers: customers, auto_reply: auto_reply },
  };
}
