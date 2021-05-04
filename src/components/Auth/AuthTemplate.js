import { Box, Container, Fab, Grid, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Link from "next/link";
export default function AuthTemplate({ children, back,title }) {
  return (
    <Container>
      <Box>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ padding: "80px 0px" }}
        >
          <Grid item xs={12} md={6}>
            <div
              style={{
                margin: "20px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link href={back} passHref>
                <Fab color="secondary" size="small" aria-label="add">
                  <ArrowBack />
                </Fab>
              </Link>
              <Typography variant="h4" style={{marginLeft:"8px"}}>
                {title}
              </Typography>
            </div>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
