import React from 'react';

// Css frame work
import { Box } from '@mui/system';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

interface Props {
  label: string;
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
}

const CMHText = ({ label, children }: Props) => {
  return <Box sx={{}}></Box>;
};

export default CMHText;
