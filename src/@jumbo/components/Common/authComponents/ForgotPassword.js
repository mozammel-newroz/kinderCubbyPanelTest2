import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Collapse, fade, IconButton, Link } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import CmtImage from '../../../../@coremat/CmtImage';

import IntlMessages from '../../../utils/IntlMessages';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import { setForgetPassMailSent } from '../../../../redux/actions/Auth';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: fade(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    [theme.breakpoints.up('md')]: {
      order: 1,
      width: props => (props.variant === 'default' ? '50%' : '100%'),
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
  alertRoot: {
    marginBottom: 10,
  },
}));

//variant = 'default', 'standard', 'bgColor'
const ForgotPassword = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const { send_forget_password_email } = useSelector(({ auth }) => auth);
  const [open, setOpen] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const history = useHistory();

  useEffect(() => {
    let timeOutStopper = null;
    if (send_forget_password_email) {
      setOpen(true);

      timeOutStopper = setTimeout(() => {
        dispatch(setForgetPassMailSent(false));
        history.push('/');
      }, 1500);
    }

    return () => {
      if (timeOutStopper) clearTimeout(timeOutStopper);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send_forget_password_email]);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios({
        url: `/api/v1/public/auth/forgot-password/send-otp?email=${email}`,
        method: 'GET',
      });
      console.log('res', res);
      if (res.data.code === 200) {
        setSendOtp(true);
        setOpen(true);
        setMessage(res.data.message);
        setMessageType('success');
      }
    } catch (error) {
      setOpen(true);
      setMessageType('warning');

      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  const onSubmitOtp = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await axios({
        url: `/api/v1/public/auth/forgot-password/verify-otp`,
        method: 'POST',
        data: {
          email,
          otp,
        },
      });

      if (res.data.code === 200) {
        setVerifyOtp(true);
        setOpen(true);
        setMessage(res.data.message);
        setMessageType('success');
      }
    } catch (error) {
      setOpen(true);
      setMessageType('warning');

      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  const resetPassword = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await axios({
        url: `/api/v1/public/auth/forgot-password/reset-password`,
        method: 'POST',
        data: {
          email,
          otp,
          newPassword: password,
          confirmNewPassword: confirmPassword,
        },
      });

      if (res.data.code === 200) {
        setOpen(true);
        setMessage(res.data.message);
        setMessageType('success');
        setTimeout(() => {
          history.push('/signin');
        }, 3000);
      }
    } catch (error) {
      setOpen(true);
      setMessageType('warning');

      setMessage(error.response.data.errors[0]);
    }
    setLoading(false);
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}>{loading ? <LinearProgress /> : null}</div>

      {variant === 'default' ? (
        <div className={classes.authThumb}>
          <CmtImage src={'/images/auth/forgot-img.png'} />
        </div>
      ) : null}
      <div className={classes.authContent}>
        <div className={'mb-7'}>
          <NavLink to="/">
            <CmtImage src={'/images/logo.png'} />
          </NavLink>
        </div>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          ForgotPassword
        </Typography>
        <Collapse in={open}>
          <Alert
            variant="outlined"
            severity={messageType}
            className={classes.alertRoot}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            {message}
          </Alert>
        </Collapse>

        {verifyOtp ? (
          <form onSubmit={resetPassword}>
            <div className={'mb-5'}>
              <TextField
                label="New Password"
                fullWidth
                onChange={event => setPassword(event.target.value)}
                value={password}
                margin="normal"
                variant="outlined"
                type="password"
                className={classes.textFieldRoot}
              />
            </div>
            <div className={'mb-5'}>
              <TextField
                label="Confirm New Password"
                fullWidth
                onChange={event => setConfirmPassword(event.target.value)}
                value={confirmPassword}
                margin="normal"
                variant="outlined"
                type="password"
                className={classes.textFieldRoot}
              />
            </div>
            <div className={'mb-5'}>
              <Button type="submit" variant="contained" color="primary">
                Reset Password
              </Button>
            </div>
          </form>
        ) : sendOtp ? (
          <form onSubmit={onSubmitOtp}>
            <div className={'mb-5'}>
              <TextField
                label="Enter your OTP"
                fullWidth
                onChange={event => setOtp(event.target.value)}
                value={otp}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </div>
            <div className={'mb-5'}>
              <Button type="submit" variant="contained" color="primary">
                Verify OTP
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmit}>
            <div className={'mb-5'}>
              <TextField
                label={<IntlMessages id="appModule.email" />}
                fullWidth
                onChange={event => setEmail(event.target.value)}
                defaultValue={email}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </div>
            <div className={'mb-5'}>
              <Button type="submit" variant="contained" color="primary">
                <IntlMessages id="appModule.resetPassword" />
              </Button>
            </div>

            <div>
              <Typography>
                Don't remember your email?
                <span className={'ml-2'}>
                  <Link href="#">
                    <IntlMessages id="appModule.contactSupport" />
                  </Link>
                </span>
              </Typography>
            </div>
          </form>
        )}

        {/* {sendOtp && !verifyOtp ? (
          <form onSubmit={onSubmitOtp}>
            <div className={'mb-5'}>
              <TextField
                label="Enter your OTP"
                fullWidth
                onChange={event => setOtp(event.target.value)}
                value={otp}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </div>
            <div className={'mb-5'}>
              <Button type="submit" variant="contained" color="primary">
                Verify OTP
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmit}>
            <div className={'mb-5'}>
              <TextField
                label={<IntlMessages id="appModule.email" />}
                fullWidth
                onChange={event => setEmail(event.target.value)}
                defaultValue={email}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </div>
            <div className={'mb-5'}>
              <Button type="submit" variant="contained" color="primary">
                <IntlMessages id="appModule.resetPassword" />
              </Button>
            </div>

            <div>
              <Typography>
                Don't remember your email?
                <span className={'ml-2'}>
                  <Link href="#">
                    <IntlMessages id="appModule.contactSupport" />
                  </Link>
                </span>
              </Typography>
            </div>
          </form>
        )} */}
        <ContentLoader />
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
