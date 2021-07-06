import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Box, Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ItemsContext } from '@jumbo/components/context/pageContext/ItemsContext';
import { ControlContext } from '@jumbo/components/context/pageContext/ControlContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(5),
  },
}));

const useStyles2 = makeStyles(theme => ({
  root: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
  table: {
    minWidth: 500,
  },
}));

const HobbyTable = () => {
  const classes = useStyles2();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [id, setId] = useState(0);

  const { items, allItem } = useContext(ItemsContext);
  const { changeControl } = useContext(ControlContext);

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async e => {
    setLoading(true);
    try {
      let res = await axios({
        url: '/api/v1/configuration/hobby/',
        method: 'GET',
      });
      allItem(res.data.data);
    } catch (error) {
      console.log('err', error.response.data.error);
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    // setLoading(true);
    console.log('id', id);
    try {
      let res = await axios({
        url: `/api/v1/configuration/hobby/${id}/`,
        method: 'DELETE',
      });
      let newItems = items.filter(item => item.id !== id);
      allItem(newItems);
      setOpen(true);
      setMessageType('success');
      setMessage(res.data.message);
    } catch (error) {
      console.log('err', error.response.data.error);

      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.error);
    }
    setDeleteOpen(false);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const clickOnDelete = rowId => {
    setId(rowId);
    setDeleteOpen(true);
  };

  const handleClickEdit = item => {
    changeControl('edit', item);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <GridContainer>
        <Grid item md={12}>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={messageType} elevation={6} variant="filled">
              {message}
            </Alert>
          </Snackbar>

          <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <h4>Title</h4>
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    <h4>Status</h4>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    Action
                  </TableCell>
                </TableRow>
                {!loading ? (
                  items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.title}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>{item.status ? <Check /> : <Clear />}</TableCell>
                      <TableCell style={{ width: 60 }} align="right">
                        <IconButton aria-label="edit" className={classes.margin} onClick={() => handleClickEdit(item)}>
                          <Edit fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton aria-label="delete" className={classes.margin} onClick={e => clickOnDelete(item.id)}>
                          <DeleteIcon fontSize="small" color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell>
                        <Skeleton></Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton></Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton></Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton></Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton></Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circle">
                          <Avatar />
                        </Skeleton>
                      </TableCell>
                    </TableRow>
                  </>
                )}

                {!loading && items.length < 0 ? (
                  <TableRow>
                    <TableCell colspan="3" style={{ textAlign: 'center' }}>
                      There is no data
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
              <TableFooter>
                <TableRow></TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

          <Dialog
            open={deleteOpen}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'Are you sure to delete?'}</DialogTitle>

            <DialogActions>
              <Button onClick={handleCloseDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </GridContainer>
    </Box>
  );
};

export default HobbyTable;
