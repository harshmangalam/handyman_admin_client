import Link from "next/link";

import {
  Avatar,
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

import { Delete, Edit, Add } from "@material-ui/icons";

export default function Page() {
  const { data, error } = useSWR(`/page`);
  return (
    <div>
      <section>
        <Typography variant="h5">Categories</Typography>
      </section>

      <section style={{ margin: "16px 0px", textAlign: "center" }}>
        <Link href="/page/create" passHref>
          <Button variant="contained" startIcon={<Add />} color="primary">
            Create Page
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
                  <TableCell>Page ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>

                  <TableCell>CreatedAt</TableCell>
                  <TableCell>UpdatedAt</TableCell>

                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.data.pages.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.updatedAt}</TableCell>
                      <TableCell>
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {data && (
            <Typography style={{ padding: "16px" }}>
              {" "}
              Total : {data.data.meta.count}{" "}
            </Typography>
          )}
        </Paper>
      </section>
    </div>
  );
}
