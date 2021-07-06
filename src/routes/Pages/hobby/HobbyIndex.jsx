import React, { useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';

import { Box, Card, CardContent, Typography, Button, TextField, Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HobbyTable from './HobbyTable';
import HobbyForm from './HobbyForm';

const useStyles = makeStyles(theme => ({}));

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Hobby', isActive: true },
];

const HobbyIndex = () => {
  const classes = useStyles();
  const name = useState('none');
  return (
    <PageContainer heading="Hobby" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item md={8}>
          <HobbyTable />
        </Grid>

        <Grid item md={4}>
          <HobbyForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default HobbyIndex;
