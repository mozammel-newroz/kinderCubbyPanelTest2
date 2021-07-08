import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import GridContainer from '@jumbo/components/GridContainer';

import { Box, Card, CardContent, Button, TextField, Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ItemsContext } from '@jumbo/components/context/pageContext/ItemsContext';
import { ControlContext } from '@jumbo/components/context/pageContext/ControlContext';
const AllergyForm = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { addItem, allItem, items } = useContext(ItemsContext);
  const { control, changeControl } = useContext(ControlContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let data = {
        title,
        status,
      };
      let res = await axios({
        url: '/api/v1/configuration/allergy/',
        method: 'POST',
        data: data,
      });
      addItem(res.data.data);
      setOpen(true);
      setMessageType('success');
      setMessage(res.data.message);
      setTitle('');
      setStatus(false);
    } catch (error) {
      console.log('err', error.response.data.errors[0]);
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let data = {
        title,
        status,
      };
      let res = await axios({
        url: `/api/v1/configuration/allergy/${control.data.id}/`,
        method: 'PUT',
        data: data,
      });
      let myItems = items.map(e => {
        if (e.id === control.data.id) {
          e['id'] = e.id;
          e['title'] = title;
          e['status'] = status;
        }
        return e;
      });

      allItem(myItems);
      setOpen(true);
      setMessageType('success');
      setMessage(res.data.message);
    } catch (error) {
      console.log('err', error.response.data.errors[0]);
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    changeControl('create', { title: '', status: false, id: 'create' });
    setTitle('');
    setStatus(false);
  };

  useEffect(() => {
    if (control.action === 'edit') {
      console.log('ddd', control.data);
      setTitle(control.data.title);
      setStatus(control.data.status);
      setId(control.data.id);

      window.scrollTo({
        top: 70,
        left: 70,
        behavior: 'smooth',
      });
    }
  }, [control.id]);

  useEffect(() => {
    handleCancel();
  }, []);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={messageType} elevation={6} variant="filled">
          {message}
        </Alert>
      </Snackbar>
      {loading ? <LinearProgress /> : null}
      <Card>
        <CardContent>
          {control.action === 'edit' ? (
            <div>
              <h3>Edit Information</h3>
              <form onSubmit={handleUpdate}>
                <GridContainer>
                  <Grid item md={12}>
                    <Box mt={4}>
                      <TextField fullWidth label="" value={title} onChange={e => setTitle(e.target.value)} />
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box mt={4}>
                      <FormControlLabel
                        control={<Switch checked={status} onChange={e => setStatus(!status)} name="checkedA" />}
                        label="Status"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Update
                    </Button>
                    <Button color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Grid>
                </GridContainer>
              </form>
            </div>
          ) : (
            <div>
              <h3>Add New Allergy</h3>
              <form onSubmit={handleCreate}>
                <GridContainer>
                  <Grid item md={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Allergy Title"
                      onChange={e => setTitle(e.target.value)}
                      value={title}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Box mt={4}>
                      <FormControlLabel
                        control={<Switch checked={status} onChange={e => setStatus(!status)} name="checkedA" />}
                        label="Status"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Add Allergy
                    </Button>
                  </Grid>
                </GridContainer>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AllergyForm;
