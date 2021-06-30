import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box, fade } from '@material-ui/core';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import { NavLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import { AuthContext } from '@jumbo/components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: fade(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: fade(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));
//variant = 'default', 'standard'
const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let data = {
        email,
        password,
        grant_type: 'password',
        client_id: 'mobile-app',
        client_secret: '2de5eb1e-e4be-416e-9d3b-3f8a6135410b',
        scope: 'openid profile',
      };
      let res = await axios({
        url: '/api/v1/public/auth/signin',
        method: 'POST',
        data: data,
      });
      console.log('res', res);
      if (res.data.code === 200) {
        login(res.data.data);
        history.push('/');
      }
    } catch (error) {
      console.log('error', error.response.data.errors[0]);
      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log('base url', process.env.REACT_APP_BASE_URL);
  }, []);

  return (
    <>
      <AuthWrapper variant={wrapperVariant}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}>{loading ? <LinearProgress /> : null}</div>
        {variant === 'default' ? (
          <Box className={classes.authThumb}>
            <CmtImage src={'/images/auth/login-img.png'} />
          </Box>
        ) : null}

        <Box className={classes.authContent}>
          <Box mb={7}>
            <CmtImage src={'/images/logo.png'} />
          </Box>
          <Typography component="div" variant="h1" className={classes.titleRoot}>
            Login
          </Typography>
          {message ? (
            <Alert variant="outlined" severity="error" className={classes.error}>
              {message}
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label={<IntlMessages id="appModule.email" />}
                fullWidth
                onChange={event => setEmail(event.target.value)}
                defaultValue={email}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="password"
                label={<IntlMessages id="appModule.password" />}
                fullWidth
                onChange={event => setPassword(event.target.value)}
                defaultValue={password}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
              <FormControlLabel
                className={classes.formcontrolLabelRoot}
                control={<Checkbox name="checkedA" />}
                label="Remember me"
              />
              <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
                <NavLink to="/forgot-password">
                  <IntlMessages id="appModule.forgotPassword" />
                </NavLink>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                <IntlMessages id="appModule.signIn" />
              </Button>

              <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
                <NavLink to="/signup">
                  <IntlMessages id="signIn.signUp" />
                </NavLink>
              </Box>
            </Box>
          </form>

          {dispatch(AuhMethods[method].getSocialMediaIcons())}

          <ContentLoader />
        </Box>
      </AuthWrapper>
    </>
  );
};

export default SignIn;
