import {Typography} from '@mui/material';
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ListItem = (props) => {
  const {alt, src, title, caption} = props;

  return (
    <>
      <Stack direction="row" sx={{mb: 2}}>
        <Avatar variant="rounded" alt={alt} src={src} sx={{m: 1}} />
        <Stack direction="column" sx={{m: 1}}>
          <Typography>{title}</Typography>
          <Typography color="text.secondary" sx={{fontSize: '0.65rem'}}>
            {caption}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
export default ListItem;
