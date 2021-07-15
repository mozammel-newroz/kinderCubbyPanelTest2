import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import GridContainer from '@jumbo/components/GridContainer';

import { Box, Card, CardContent, Button, TextField, Grid } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import PhotoCamera from '@material-ui/icons/PhotoCamera';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { ItemsContext } from '@jumbo/components/context/pageContext/ItemsContext';
import { ControlContext } from '@jumbo/components/context/pageContext/ControlContext';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const NoImage = '/images/icons/system.png';
const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));
const BookForm = () => {
  const classes = useStyles();
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState([]);
  const [genreValue, setGenreValue] = useState('');
  const [genreName, setGenreName] = useState('');
  const [author, setAuthor] = useState([]);
  const [authorValue, setAuthorValue] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publication, setPublication] = useState([]);
  const [publicationValue, setPublicationValue] = useState('');
  const [publicationName, setPublicationName] = useState('');
  const [status, setStatus] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(NoImage);

  const { addItem, allItem, items } = useContext(ItemsContext);
  const { control, changeControl } = useContext(ControlContext);

  const [publishedDate, setPublishedDate] = useState(new Date());

  const handleDateChange = date => {
    setPublishedDate(date);
  };

  const handleGenreChange = event => {
    setGenreValue(event.target.value);
  };
  const handleAuthorChange = event => {
    setAuthorValue(event.target.value);
  };
  const handlePublicationChange = event => {
    setPublicationValue(event.target.value);
  };

  const getGenre = async e => {
    try {
      let res = await axios({
        url: '/api/v1/configuration/genre/',
        method: 'GET',
      });
      setGenre(res.data.data);
    } catch (error) {
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.error);
    }
  };
  const getAuthor = async e => {
    try {
      let res = await axios({
        url: '/api/v1/configuration/author/',
        method: 'GET',
      });
      setAuthor(res.data.data);
      console.log('author', res.data.data)
    } catch (error) {
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.error);
    }
  };
  const getPublication = async e => {
    try {
      let res = await axios({
        url: '/api/v1/configuration/publication/',
        method: 'GET',
      });
      setPublication(res.data.data);
    } catch (error) {
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.error);
    }
  };
  const imageProcess = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.onload = x => {
        setImageFile(imageFile);
        setPreview(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageFile(null);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async e => {
    e.preventDefault();
    setLoading(true);
    let date = moment(publishedDate).format('YYYY-MM-DD');
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('genre', genreValue);
    formdata.append('author', authorValue);
    formdata.append('publication', publicationValue);
    formdata.append('published_at', date);
    formdata.append('cover_image', imageFile);

    try {
      let res = await axios({
        url: '/api/v1/configuration/book/',
        method: 'POST',
        data: formdata,
      });
      let responseData = res.data.data;
      let oldGenreId = responseData.genre[0];
      let oldAuthorId = responseData.author[0];
      let oldPublicationId = responseData.publication[0];

      let newGenre = [
        {
          id: oldGenreId,
          name: genreName,
        },
      ];
      let newAuthor = [
        {
          id: oldAuthorId,
          name: authorName,
        },
      ];
      let newPublication = [
        {
          id: oldPublicationId,
          name: publicationName,
        },
      ];

      let newData = {
        ...responseData,
        author: newAuthor,
        genre: newGenre,
        publication: newPublication,
      };
      addItem(newData);
      setOpen(true);
      setMessageType('success');
      setMessage(res.data.message);
      setName('');
      setAuthorValue('');
      setPublicationValue('');
      setGenreValue('');
      setImageFile(null);
      setPreview(NoImage);
      setPublishedDate(new Date());
      setStatus(false);
    } catch (error) {
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    let date = moment(publishedDate).format('YYYY-MM-DD');
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('genre', genreValue);
    formdata.append('author', authorValue);
    formdata.append('publication', publicationValue);
    formdata.append('published_at', date);
    if (imageFile) {
      formdata.append('cover_image', imageFile);
    }

    try {
      let res = await axios({
        url: `http://65.2.57.194:6004/api/v1/configuration/book/${control.data.id}/`,
        method: 'PATCH',
        data: formdata,
      });

      let myItems = items.map(e => {
        if (e.id === control.data.id) {
          e['id'] = e.id;
          e['name'] = name;
          e['genre'] = [{ id: genreValue, name: genreName }];

          e['author'] = [{ id: authorValue, name: authorName }];
          e['publication'] = [{ id: publicationValue, name: publicationName }];
          e['published_at'] = date;

          e['cover_image'] = preview;
        }
        return e;
      });
      allItem(myItems);
      setOpen(true);
      setMessageType('success');
      setMessage(res.data.message);
    } catch (error) {
      console.log('err', error.response);
      setOpen(true);
      setMessageType('warning');
      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    changeControl('create', {
      name: '',
      id: 'create',
    });
    setId(0);
    setName('');
    setAuthorValue('');
    setGenreValue('');
    setPublicationValue('');
    setPublishedDate(new Date());
    setPreview(NoImage);
  };

  // const handleCancel = () => {
  //   changeControl('create', { title: '', status: false, id: 'create' });
  //   // setTitle('');
  //   setStatus(false);
  // };

  useEffect(() => {
    if (control.action === 'edit') {
      setId(control.data.id);
      setName(control.data.name);
      setAuthorValue(control.data.author ? control.data.author[0].id : '');
      setGenreValue(control.data.genre ? control.data.genre[0].id : '');
      setPublicationValue(control.data.publication ? control.data.publication[0].id : '');
      setPublishedDate(control.data.published_at);
      setPreview(control.data.cover_image);

      window.scrollTo({
        top: 70,
        left: 70,
        behavior: 'smooth',
      });
    }
  }, [control.id]);

  useEffect(() => {
    handleCancel();
    getAuthor();
    getGenre();
    getPublication();
  }, []);

  return (
    <div>
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
              <h3>Update Book</h3>
              <form onSubmit={handleUpdate}>
                <GridContainer>
                  <Grid item md={12}>
                    <Box mt={4}>
                      <TextField fullWidth label="" value={name} onChange={e => setName(e.target.value)} />
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="genre">Genre</InputLabel>
                      <Select labelId="genre" id="genre" value={genreValue} onChange={handleGenreChange}>
                        {genre.map((item, i) => (
                          <MenuItem key={i} value={item.id} onClick={() => setGenreName(item.name)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="publication">Publication</InputLabel>
                      <Select
                        labelId="publication"
                        id="publication"
                        value={publicationValue}
                        onChange={handlePublicationChange}>
                        {publication.map((item, i) => (
                          <MenuItem key={i} value={item.id} onClick={() => setPublicationName(item.name)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="author">Author</InputLabel>
                      <Select labelId="author" id="author" value={authorValue} onChange={handleAuthorChange}>
                        {author.map((item, i) => (
                          <MenuItem key={i} value={item.id} onClick={() => setAuthorName(item.name)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justifycontent="space-around">
                        <KeyboardDatePicker
                          fullWidth
                          disableToolbar
                          variant="inline"
                          format="dd-MMM-yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date picker inline"
                          value={publishedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={12}>
                    <div>
                      <img
                        src={preview}
                        alt=""
                        width="120px"
                        height="120px"
                        style={{
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      />
                    </div>

                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      onChange={imageProcess}
                    />

                    <label htmlFor="contained-button-file">
                      <Button variant="outlined" color="primary" component="span" style={{ marginTop: '15px' }} fullWidth>
                        <PhotoCamera /> Upload Image
                      </Button>
                    </label>
                  </Grid>
                  {/* <Grid item md={12}>
                    <Box mt={4}>
                      <FormControlLabel
                        control={<Switch checked={status} onChange={e => setStatus(!status)} name="checkedA" />}
                        label="Status"
                      />
                    </Box>
                  </Grid> */}
                  <Grid item md={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Edit Book
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
              <h3>Add New Book</h3>
              <form onSubmit={handleCreate}>
                <GridContainer>
                  <Grid item md={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Book Title"
                      onChange={e => setName(e.target.value)}
                      value={name}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="genre">Genre</InputLabel>
                      <Select labelId="genre" id="genre" value={genreValue} onChange={handleGenreChange}>
                        {genre.map((item, i) => (
                          <MenuItem key={i} value={item.id} onClick={() => setGenreName(item.name)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="publication">Publication</InputLabel>
                      <Select
                        labelId="publication"
                        id="publication"
                        value={publicationValue}
                        onChange={handlePublicationChange}>
                        {publication.map((item, i) => (
                          <MenuItem key={i} value={item.id} onClick={() => setPublicationName(item.name)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="author">Author</InputLabel>
                      <Select labelId="author" id="author" value={authorValue} onChange={handleAuthorChange}>
                        {author.map((item, i) => (
                          <MenuItem key={i} value={item.id} onClick={() => setAuthorName(item.name)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justifycontent="space-around">
                        <KeyboardDatePicker
                          fullWidth
                          disableToolbar
                          variant="inline"
                          format="dd-MMM-yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date picker inline"
                          value={publishedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={12}>
                    <div>
                      <img
                        src={preview}
                        alt=""
                        width="120px"
                        height="120px"
                        style={{
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      />
                    </div>

                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      onChange={imageProcess}
                    />

                    <label htmlFor="contained-button-file">
                      <Button variant="outlined" color="primary" component="span" style={{ marginTop: '15px' }} fullWidth>
                        <PhotoCamera /> Upload Image
                      </Button>
                    </label>
                  </Grid>
                  {/* <Grid item md={12}>
                    <Box mt={4}>
                      <FormControlLabel
                        control={<Switch checked={status} onChange={e => setStatus(!status)} name="checkedA" />}
                        label="Status"
                      />
                    </Box>
                  </Grid> */}
                  <Grid item md={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                      Add New Book
                    </Button>
                  </Grid>
                </GridContainer>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookForm;
