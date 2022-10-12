import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { saveAs } from "file-saver";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const columns = [
  { id: "id", label: "Id", minWidth: 50 },
  { id: "author", label: "Author", minWidth: 50 },
  {
    id: "url",
    label: "Url",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "width",
    label: "Width",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "height",
    label: "Height",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "download_url",
    label: "Download",
    minWidth: 170,
    align: "center",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 640,
  },
});

export default function List() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rowData, setRowData] = useState([]);
  const [totalLenght, setTotalLenght] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getList(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    getList(page);
  };
  useEffect(() => {
    withLenghtGetList();
  }, []);

  //  this function only get data not get total lenght for
  // this resone i am create one more function for get lenght.

  const withLenghtGetList = () => {
    const url = "https://picsum.photos/v2/list";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRowData(data);
        setTotalLenght(data.length);
      });
  };
  const getList = (pageNO) => {
    const url = `https://picsum.photos/v2/list?page=${
      pageNO + 1
    }&limit=${totalLenght}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRowData(data);
      });
  };
  const downloadImage = (dow_url) => {
    saveAs("image_url", dow_url); // Put your image url here.
  };
  return (
    <Paper className={classes.root}>
      <p className="notes">
        In this Api Images and Download both paths are Wrong that by its doesn't
        work Thank you
      </p>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">
                      <Link to={`/showData/${row.id}`}>{row.author}</Link>
                    </TableCell>
                    <TableCell align="center">
                      <img src={row.url} width="80px" />
                    </TableCell>
                    <TableCell align="center">{row.width}</TableCell>
                    <TableCell align="center">{row.height}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => downloadImage(row.download_url)}
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={totalLenght}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
