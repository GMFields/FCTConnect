import React, { useState, useEffect } from "react";
import './Users.css'
import { filter } from 'lodash';
import {
  Card,
  Table,
  Paper,
  Button,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from '@material-ui/core';
import Cookies from "js-cookie";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Users = (props) => {
  let username = '';
  const token = Cookies.get('token');

  const [selectedInactiveUsers, setSelectedInactiveUsers] = useState([]);
  const [showActivateButton, setShowActivateButton] = useState(false);


  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(null);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  const [inactivePage, setInactivePage] = useState(0);
  const [inactiveRowsPerPage, setInactiveRowsPerPage] = useState(5);
  const [allPage, setAllPage] = useState(0);
  const [allRowsPerPage, setAllRowsPerPage] = useState(5);

  const handleChangeInactivePage = (event, newPage) => {
    setInactivePage(newPage);
  };

  const handleChangeAllPage = (event, newPage) => {
    setAllPage(newPage);
  };

  const handleChangeInactiveRowsPerPage = (event) => {
    setInactivePage(0);
    setInactiveRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeAllRowsPerPage = (event) => {
    setAllPage(0);
    setAllRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = inactiveUsers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClick = (event, name, isInactive) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
  
    if (isInactive) {
      const selectedInactiveIndex = selectedInactiveUsers.indexOf(name);
      if (selectedInactiveIndex === -1) {
        newSelected = newSelected.concat(selectedInactiveUsers, name);
      } else {
        newSelected = selectedInactiveUsers.filter((user) => user !== name);
      }
      setSelectedInactiveUsers(newSelected);
      setShowActivateButton(newSelected.length > 0);
    } else {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    }
  };
  

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyInactiveRows = inactivePage > 0 ? Math.max(0, (1 + inactivePage) * inactiveRowsPerPage - inactiveUsers.length) : 0;
  const emptyUsersRows = allPage > 0 ? Math.max(0, (1 + allPage) * allRowsPerPage - allUsers.length) : 0;

  const filteredInactiveUsers = applySortFilter(inactiveUsers, getComparator(order, orderBy), filterName);
  const filteredAllUsers = applySortFilter(allUsers, getComparator(order, orderBy), filterName);

  const isInactiveNotFound = !filteredInactiveUsers.length && !!filterName;
  const isAllNotFound = !filteredAllUsers.length && !!filterName;

  const handleActivateUsers = () => {
    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/admin/activate?tokenObj=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: inactiveUsers,
    })
      .then((response) => response.json())
      .then((data) => {
         console.log("Users activated succesfuly:", data)
      })
      .catch((error) => {
        console.log(inactiveUsers);S
        console.error("Erro ao ativar utilizadores:", error);
      });
  };
  useEffect(() => {
    const handleInactiveUsers = () => {
      fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/admin?tokenObj=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setInactiveUsers(data);
          handleAllUsers();
        })
        .catch((error) => {
          console.error("Erro ao obter lista de utilizadores inativos:", error);
        });
    };

    const handleAllUsers = () => {
      fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/admin/list?tokenObj=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAllUsers(data);
        })
        .catch((error) => {
          console.error("Erro ao obter lista de utilizadores:", error);
        });
    };

    handleInactiveUsers();
  }, []);

  return (
    <div>
      <Container>
        <Box direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Utilizadores inativos
          </Typography>
        </Box>
        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableBody>
                {filteredInactiveUsers
                  .slice(inactivePage * inactiveRowsPerPage, inactivePage * inactiveRowsPerPage + inactiveRowsPerPage)
                  .map((user) => {
                    const id = user;
                    username = user[0];
                    const name = user[0];
                    const email = user[1];
                    const state = user[2];
                    const department = user[3];
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id, true)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Box direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={`https://helical-ascent-385614.appspot.com/gcs/helical-ascent-385614.appspot.com/${username}_pfp`} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell align="right">
                        
                          <Button variant="contained" color="primary" onClick={handleActivateUsers}>
                        Ativar
                        </Button>
                        
                        </TableCell>


                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{state}</TableCell>

                        <TableCell align="left">{department}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            {/*<Iconify icon={'eva:more-vertical-fill'} />*/}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {emptyInactiveRows > 0 && (
                  <TableRow style={{ height: 53 * emptyInactiveRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isInactiveNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={inactiveUsers.length}
            rowsPerPage={inactiveRowsPerPage}
            page={inactivePage}
            onPageChange={handleChangeInactivePage}
            onRowsPerPageChange={handleChangeInactiveRowsPerPage}
          />
        </Card>
      </Container>

      <Container>
        <Box direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Todos os Utilizadores
          </Typography>
        </Box>
        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableBody>
                {filteredAllUsers
                  .slice(allPage * allRowsPerPage, allPage * allRowsPerPage + allRowsPerPage)
                  .map((user) => {
                    const id = user;
                    const name = user[0];
                    username = [0];
                    const email = user[1];
                    const state = user[2];
                    const department = user[3];
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Box direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={`https://helical-ascent-385614.appspot.com/gcs/helical-ascent-385614.appspot.com/${username}_pfp`} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{state}</TableCell>

                        <TableCell align="left">{department}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            {/*<Iconify icon={'eva:more-vertical-fill'} />*/}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {emptyUsersRows > 0 && (
                  <TableRow style={{ height: 53 * emptyUsersRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isAllNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allUsers.length}
            rowsPerPage={allRowsPerPage}
            page={allPage}
            onPageChange={handleChangeAllPage}
            onRowsPerPageChange={handleChangeAllRowsPerPage}
          />
        </Card>
      </Container>
    </div>
  );
}

export default Users;
