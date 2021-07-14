import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { Box, Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Clear from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';

import { ItemsContext } from '@jumbo/components/context/pageContext/ItemsContext';
import { ControlContext } from '@jumbo/components/context/pageContext/ControlContext';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
const NoImage = '/images/NoImage.jpg';

const useStyles2 = makeStyles(theme => ({
  root: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
  table: {
    minWidth: 500,
  },

  dialogButtonSection: {
    padding: '8px 20px',
    justifyContent: 'space-between',
  },
  floatRigft: {
    float: 'right',
  },
}));

const BookTable = () => {
  const classes = useStyles2();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailViewItem, setDetailViewItem] = useState();

  const [openDetailView, setOpenDetailView] = useState(false);

  const handleClickOpenDetailView = () => {
    setOpenDetailView(true);
  };

  const handleCloseDetailView = () => {
    setOpenDetailView(false);
  };

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
        url: '/api/v1/configuration/book/',
        method: 'GET',
      });
      allItem(res.data.data);
    } catch (error) {
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.error);
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      let res = await axios({
        url: `/api/v1/configuration/book/${id}/`,
        method: 'DELETE',
      });
      let newItems = items.filter(item => item.id !== id);
      allItem(newItems);
      setOpen(true);
      setMessageType('success');
      setMessage(res.data.message);
    } catch (error) {
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

  const handleClickView = item => {
    setDetailViewItem(item);
    handleClickOpenDetailView();
  };

  const pageLoading = () => {
    let content = [];
    for (let i = 0; i < 10; i++) {
      content.push(
        <TableRow key={i}>
          <TableCell>
            <Skeleton />
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
        </TableRow>,
      );
    }
    return content;
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
                  <TableCell component="th" scope="row">
                    <h4>Publication</h4>
                  </TableCell>
                  <TableCell style={{ width: 80 }}>
                    <h4>Image</h4>
                  </TableCell>
                  <TableCell style={{ width: 180 }} align="right">
                    Action
                  </TableCell>
                </TableRow>
                {!loading ? (
                  items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>{item.publication[0].name}</TableCell>
                      <TableCell style={{ width: 80 }}>
                        <img src={item.cover_image ? item.cover_image : NoImage} alt="" width="40px" height="40px" />
                      </TableCell>

                      <TableCell style={{ width: 180 }} align="right">
                        <IconButton aria-label="view" className={classes.margin} onClick={() => handleClickView(item)}>
                          <VisibilityIcon fontSize="small" color="primary" />
                        </IconButton>
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
                  <div> {pageLoading()}</div>
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
                <TableRow />
              </TableFooter>
            </Table>
          </TableContainer>

          <Dialog
            open={deleteOpen}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'Are you sure to delete?'}</DialogTitle>

            <DialogActions className={classes.dialogButtonSection}>
              <Button onClick={handleCloseDelete}>Cancel</Button>
              <Button onClick={handleDelete} color="secondary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <div>
            <Dialog
              open={openDetailView}
              onClose={handleCloseDetailView}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {'Book Details'}
                <Clear className={classes.floatRigft} onClick={handleCloseDetailView} />
              </DialogTitle>

              <DialogContent>
                {detailViewItem ? (
                  <div>
                    <TableContainer>
                      <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan="2" component="th" scope="row">
                              <img
                                src={detailViewItem.cover_image ? detailViewItem.cover_image : NoImage}
                                alt=""
                                width="80px"
                                height="80px"
                                style={{
                                  display: 'block',
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Book Name
                            </TableCell>
                            <TableCell align="right">{detailViewItem.name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Genre
                            </TableCell>
                            <TableCell align="right">{detailViewItem.genre[0].name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Author
                            </TableCell>
                            <TableCell align="right">{detailViewItem.author[0].name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Publication
                            </TableCell>
                            <TableCell align="right">{detailViewItem.publication[0].name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Published Date
                            </TableCell>
                            <TableCell align="right">
                              {moment(detailViewItem.published_at).format('DD MMMM, YYYY')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Added Date
                            </TableCell>
                            <TableCell align="right">{moment(detailViewItem.added_at).format('DD MMMM, YYYY')}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Is Available
                            </TableCell>
                            <TableCell align="right">
                              {detailViewItem.is_available ? (
                                <Typography variant="h6">Available</Typography>
                              ) : (
                                <Typography variant="h6">Not Available</Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : null}
              </DialogContent>
            </Dialog>
          </div>
        </Grid>
      </GridContainer>
    </Box>
  );
};

export default BookTable;
