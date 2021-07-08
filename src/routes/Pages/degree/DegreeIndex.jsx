import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';

import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import DegreeTable from './DegreeTable';
import DegreeForm from './DegreeForm';


const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Degree', isActive: true },
];

const DegreeIndex = () => {
 
  return (
    <PageContainer heading="Degree" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item md={8}>
          <DegreeTable />
        </Grid>

        <Grid item md={4}>
          <DegreeForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default DegreeIndex;
