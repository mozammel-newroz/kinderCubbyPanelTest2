import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: <IntlMessages id={'pages.samplePage'} />, isActive: true },
];

const SamplePage = () => {
  const [cookies, setCookie] = useCookies(['k_token']);
  const handleClick = async () => {
    console.log('click');
    const res = await axios({
      url: 'http://65.2.57.194:6001/api/v1/configuration/degree/',
      method: 'get',
      data: { token: cookies.k_token },
    });
    console.log('data', res.data.data);
  };
  return (
    <PageContainer heading={<IntlMessages id="pages.samplePage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <div style={{ marginBottom: 10 }}>
            <IntlMessages id="pages.samplePage.description" />
          </div>
          <Divider />
          <div style={{ marginTop: 24 }}>
            <h3>Knowledge Base and Support</h3>
            {cookies.k_token}
            <button onClick={handleClick}>Click Now</button>
          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default SamplePage;
