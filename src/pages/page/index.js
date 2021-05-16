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

import { Edit, Add } from "@material-ui/icons";
import { useRouter } from "next/router";
import DeleteDialog from "../../components/DeleteDialog";

export default function Page() {
  const router = useRouter();
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
                  <TableCell>Slug</TableCell>
                  <TableCell>Creator</TableCell>
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
                      <TableCell>{row.slug}</TableCell>
                      <TableCell>{row.creator.name}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.updatedAt}</TableCell>
                      <TableCell>
                        <DeleteDialog url={`/page/${row._id}`} />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => router.push(`/page/${row.slug}/edit`)}
                        >
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
