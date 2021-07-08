import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import SkillTable from './SkillTable';
import SkillForm from './SkillForm';


const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Skill', isActive: true },
];

const SkillIndex = () => {
 
  return (
    <PageContainer heading="Skill" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item md={8}>
          <SkillTable />
        </Grid>

        <Grid item md={4}>
          <SkillForm />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default SkillIndex;
