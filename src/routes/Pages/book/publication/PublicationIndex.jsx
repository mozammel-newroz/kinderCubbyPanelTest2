import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PublicationTable from './PublicationTable';
import PublicationForm from './PublicationForm';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Publication ', isActive: true },
];

const PublicationIndex = () => {
  return (
    <PageContainer heading="Publication" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item md={8}>
          <PublicationTable />
        </Grid>

        <Grid item md={4}>
          <PublicationForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default PublicationIndex;
