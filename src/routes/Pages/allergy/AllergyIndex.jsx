import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import AllergyTable from './AllergyTable';
import AllergyForm from './AllergyForm';


const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Allergy', isActive: true },
];

const AllergyIndex = () => {
 
  return (
    <PageContainer heading="Allergy" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item md={8}>
          <AllergyTable />
        </Grid>

        <Grid item md={4}>
          <AllergyForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default AllergyIndex;
