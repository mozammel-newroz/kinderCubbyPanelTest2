import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import BookTable from './BookTable';
import BookForm from './BookForm';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Book', isActive: true },
];

const BookIndex = () => {
  return (
    <PageContainer heading="Book" breadcrumbs={breadcrumbs}>
      <GridContainer>
        {/* <Grid item md={12}>
          <BookForm />
        </Grid> */}
        <Grid item md={8}>
          <BookTable />
        </Grid>

        <Grid item md={4}>
          <BookForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default BookIndex;
