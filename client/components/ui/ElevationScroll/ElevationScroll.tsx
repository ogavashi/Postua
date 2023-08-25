import React from 'react';

import useScrollTrigger from '@mui/material/useScrollTrigger';

interface Props {
  children: React.ReactElement;
}

export const ElevationScroll: React.FC<Props> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};
