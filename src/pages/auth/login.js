import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import Alert from "./../../components/alert";

const Page = () => {
  const [alert, setAlert] = useState({ message: "", successful: true, open: false });
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "P@ssw0rd123",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      await auth.signIn(values.email, values.password).then(
        () => {
          setAlert({ message: "Login Successfully", successful: true, open: true });
          router.push("/");
        },
        (error) => {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error.message });
          helpers.setSubmitting(false);
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setAlert({ message: resMessage, successful: false, open: true });
        }
      );
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>Login | SGHEDA Admin Page</title>
      </Head>
      <Alert
        message={alert.message}
        successful={alert.successful}
        open={alert.open}
        handleClose={() => {
          setAlert({ ...alert, open: false });
        }}
      />
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Only website administrators can signin!!! &nbsp;
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
            </Tabs>
            {method === "email" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>Optionally you can skip.</FormHelperText>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Continue
                </Button>
                <Button fullWidth size="large" sx={{ mt: 3 }} onClick={handleSkip}>
                  Skip authentication
                </Button>
                <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert>
              </form>
            )}
            {/* {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
