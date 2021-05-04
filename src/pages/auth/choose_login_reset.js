import { Button, Grid } from "@material-ui/core";
import AuthTemplate from "../../components/Auth/AuthTemplate";
import Link from "next/link";

export default function ChooseLoginReset() {
  return (
    <AuthTemplate
      pageName="Proceed"
      navLinks={[
        {
          href: "/auth/login",
          text: "Login",
        },
        { href: "/auth/register", text: "Signup" },
      ]}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link href="/auth/reset_password" passHref>
            <Button size="large" fullWidth variant="contained" color="secondary">
              Proceed to Reset Password
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Link href="/auth/login" passHref>
            <Button size="large" fullWidth variant="contained" color="primary">
              Proceed to Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    </AuthTemplate>
  );
}
