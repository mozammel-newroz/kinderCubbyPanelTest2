import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import GenreTable from './GenreTable';
import GenreForm from './GenreForm';


const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Genre', isActive: true },
];

const GenreIndex = () => {
 
  return (
    <PageContainer heading="Genre" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item md={8}>
          <GenreTable />
        </Grid>

        <Grid item md={4}>
          <GenreForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default GenreIndex;
