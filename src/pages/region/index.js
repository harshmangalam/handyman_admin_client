import Link from "next/link";

import {
  Button,
  Typography,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useSWR from "swr";
import { Delete, Add } from "@material-ui/icons";

export default function Region() {
  const { data, error } = useSWR(`/region`);
  return (
    <div>
      <section>
        <Typography variant="h5">Regions</Typography>
      </section>

      <section style={{ margin: "16px 0px", textAlign: "center" }}>
        <Link href="/region/create" passHref>
          <Button variant="contained" startIcon={<Add />} color="primary">
            Create New Regions
          </Button>
        </Link>
      </section>

      <section>
        <Paper style={{ width: "100%" }}>
          <TableContainer style={{ maxHeight: "600px" }}>
            {!data && <LinearProgress style={{ width: "100%" }} />}
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Region ID</TableCell>

                  <TableCell>City</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>CreatedAt</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.data.regions.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>

                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.country}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>

                      <TableCell>
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data && (
            <Typography style={{ padding: "16px" }}>
              Total : {data.data.meta.count}
            </Typography>
          )}
        </Paper>
      </section>
    </div>
  );
}
