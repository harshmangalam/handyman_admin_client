import { Box, Container, Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <Box py={1}>
      <Container>
        <Typography style={{ textAlign: "center" }}>
          &copy; Trustserviceu Test {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
