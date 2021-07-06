import React, { useState } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';
import { Paper, Box, CardHeader, Card, CardContent, Typography, Button } from '@material-ui/core';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: <IntlMessages id={'DemoPage'} />, isActive: true },
];

const DemoPage = () => {
  const [name, setName] = useState('test name');
  return (
    <PageContainer heading={<IntlMessages id="DemoPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer style={{ marginTop: 100 }}>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <h3>headline</h3>
              <h2>headline</h2>
              <h1>{name}</h1>
              <Typography variant="h1">Headline h1</Typography>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto odio modi repellendus? Error deleniti
                veritatis, nemo adipisci expedita cum optio nobis porro mollitia? Maiores voluptatem delectus qui a itaque
                deserunt.
              </p>
              <Box mt={5}>
                <Button variant="contained" color="primary" mt={{ md: 100 }}>
                  Click Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, provident. Porro neque cumque totam
              laudantium minima fugiat ex quasi et numquam, iste animi quia eveniet eum fuga recusandae, dolorem iusto.
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, provident. Porro neque cumque totam
              laudantium minima fugiat ex quasi et numquam, iste animi quia eveniet eum fuga recusandae, dolorem iusto.
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, provident. Porro neque cumque totam
              laudantium minima fugiat ex quasi et numquam, iste animi quia eveniet eum fuga recusandae, dolorem iusto.
            </CardContent>
          </Card>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default DemoPage;
