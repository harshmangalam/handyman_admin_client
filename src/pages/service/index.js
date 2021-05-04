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
  TablePagination,
  Avatar,
} from "@material-ui/core";
import useSWR from "swr";
import { useState } from "react";
import { Delete, Edit, Add } from "@material-ui/icons";

export default function Service() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);

  const { data, error } = useSWR(`/service?limit=${limit}&page=${page}`);

  return (
    <div>
      <section>
        <Typography variant="h5">Services</Typography>
      </section>

      <section style={{ margin: "16px 0px", textAlign: "center" }}>
        <Link href="/service/create" passHref>
          <Button variant="contained" startIcon={<Add />} color="primary">
            Add New Services
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
                  <TableCell>Service ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Creator</TableCell>
                  <TableCell>CreatedAt</TableCell>
                  <TableCell>UpdatedAt</TableCell>

                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.data.services.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>
                        <Avatar src={row.image} variant="rounded" />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.category.name}</TableCell>
                      <TableCell>{row.creator.name}</TableCell>
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
            <TablePagination
              rowsPerPageOptions={[1, 2, 3]}
              component="div"
              count={data.data.meta.count}
              rowsPerPage={limit}
              page={page}
              onChangePage={(e, newPage) => setPage(newPage)}
              onChangeRowsPerPage={(e) => setLimit(e.target.value)}
            />
          )}
        </Paper>
      </section>
    </div>
  );
}
