import {
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
    Chip,
  } from "@material-ui/core";
  import useSWR from "swr";
  import { useState } from "react";
  import { Delete, Edit, Add } from "@material-ui/icons";
  
  export default function Admin() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(1);
  
    const { data, error } = useSWR(
      `/profile?limit=${limit}&page=${page}&role=ADMIN`
    );
  
    return (
      <div>
        <section>
          <Typography variant="h5">Admins</Typography>
        </section>
  
        <section style={{ marginTop: "20px" }}>
          <Paper style={{ width: "100%" }}>
            <TableContainer style={{ maxHeight: "600px" }}>
              {!data && <LinearProgress style={{ width: "100%" }} />}
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Blocked</TableCell>
                    <TableCell>Account Verified</TableCell>
                    <TableCell>CreatedAt</TableCell>
                    <TableCell>UpdatedAt</TableCell>
  
                    <TableCell>Delete</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {data &&
                    data.data.users.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell>{row._id}</TableCell>
                        <TableCell>
                          {row.profilePic && (
                            <Avatar src={row.profilePic} variant="rounded" />
                          )}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>
                          <Chip label={row.isBlocked ? "Yes" : "No"} />
                        </TableCell>
                        <TableCell>
                          <Chip label={row.isAccountVerified ? "Yes" : "No"} />
                        </TableCell>
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
  