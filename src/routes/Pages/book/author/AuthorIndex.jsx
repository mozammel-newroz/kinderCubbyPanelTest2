import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import AuthorTable from './AuthorTable';
import AuthorForm from './AuthorForm';


const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Author', isActive: true },
];

const AuthorIndex = () => {
 
  return (
    <PageContainer heading="Author" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item md={8}>
          <AuthorTable />
        </Grid>

        <Grid item md={4}>
          <AuthorForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default AuthorIndex;
