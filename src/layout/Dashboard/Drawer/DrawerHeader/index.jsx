import PropTypes from 'prop-types';

// project imports
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';
import { Box, Typography } from '@mui/material';
import { PropertySafetyTwoTone } from '@ant-design/icons';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  return (
    <DrawerHeaderStyled
      open={open}
      sx={{
        minHeight: '60px',
        width: 'initial',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0
      }}
    >
      <Box sx={{ width: open ? 'auto' : 35, height: 35,display:'flex',alignItems:'center' }}>
        <PropertySafetyTwoTone style={{fontSize:"35px"}}/>&nbsp;&nbsp;&nbsp;&nbsp;
        <Typography variant='h5'>Admin Portal</Typography>
      </Box>
      {/* <Logo isIcon={!open} sx={{ width: open ? 'auto' : 35, height: 35 }} /> */}
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
