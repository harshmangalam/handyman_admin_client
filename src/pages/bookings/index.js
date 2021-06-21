import Link from "next/link";

import {
  Button,
  Typography,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import useSWR from "swr";
import { useState } from "react";
import { Edit, Add } from "@material-ui/icons";
import { useRouter } from "next/router";
import DeleteDialog from "../../components/DeleteDialog";
import { FaCheckCircle, FaDotCircle } from "react-icons/fa";
export default function Bookings() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);

  const router = useRouter();

  const { data, error } = useSWR(`/booking`);
  return (
    <div>
      <section>
        <Typography variant="h5">Bookings</Typography>
      </section>

      <section>
        <Paper style={{ width: "100%" }}>
          <TableContainer style={{ maxHeight: "600px" }}>
            {!data && <LinearProgress style={{ width: "100%" }} />}
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Payment Status</TableCell>

                  <TableCell>Address</TableCell>

                  <TableCell>Booking Date</TableCell>
                  <TableCell>Booking Time</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Service Name</TableCell>

                  <TableCell>Category Name</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Remove</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.data.bookings.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.user.name}
                      </TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.totalPrice}</TableCell>
                      <TableCell>{row.currency}</TableCell>
                      <TableCell>{row.paymentMode}</TableCell>
                      <TableCell>
                        {row.isPaymentDone ? (
                          <FaCheckCircle fontSize="20px" color="green" />
                        ) : (
                          <FaDotCircle fontSize="20px" color="red" />
                        )}
                      </TableCell>
                      <TableCell>{row.address}</TableCell>

                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.country}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.service.name}</TableCell>
                      <TableCell>{row.service.category.name}</TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Remove</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            router.push(`/bookings/${row._id}/status`)
                          }
                        >
                          View Status
                        </Button>
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
