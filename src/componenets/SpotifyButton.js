import * as React from 'react';
import {styled} from '@mui/system';
import Link from '@mui/material/Link';
import ContactlessIcon from '@mui/icons-material/Contactless';
import {useThemeProps} from '@mui/system';
import {ButtonBase} from '@mui/material';
import {generateUtilityClass, generateUtilityClasses} from '@mui/base';
import {getBaseAPIURL} from '../utils/index';

export function getBottomNavigationActionUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigationAction', slot);
}

const bottomNavigationActionClasses = generateUtilityClasses(
    'MuiBottomNavigationAction',
    ['root', 'iconOnly', 'selected', 'label'],
);

const BottomNavigationActionRoot = styled(ButtonBase, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {ownerState} = props;

    return [
      styles.root,
      !ownerState.showLabel && !ownerState.selected && styles.iconOnly,
    ];
  },
})(({theme, ownerState}) => ({
  transition: theme.transitions.create(['color', 'padding-top'], {
    duration: theme.transitions.duration.short,
  }),
  padding: '0px 12px',
  minWidth: 80,
  maxWidth: 168,
  color: (theme.vars || theme).palette.text.secondary,
  flexDirection: 'column',
  flex: '1',
  ...(!ownerState.showLabel &&
    !ownerState.selected && {
    paddingTop: 14,
  }),
  ...(!ownerState.showLabel &&
    !ownerState.selected &&
    !ownerState.label && {
    paddingTop: 0,
  }),
  [`&.${bottomNavigationActionClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.main,
  },
}));

const BottomNavigationActionLabel = styled('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})(({theme, ownerState}) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(12),
  opacity: 1,
  transition: 'font-size 0.2s, opacity 0.2s',
  transitionDelay: '0.1s',
  ...(!ownerState.showLabel &&
    !ownerState.selected && {
    opacity: 0,
    transitionDelay: '0s',
  }),
  [`&.${bottomNavigationActionClasses.selected}`]: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

const SpotifyButton = React.forwardRef(function SpotifyButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiBottomNavigationAction',
  });
  const {
    ...other
  } = props;

  const baseURL = `${getBaseAPIURL()}/authorize`;

  const ownerState = props;

  return (
    <BottomNavigationActionRoot
      ref={ref}
      focusRipple
      ownerState={ownerState}
      {...other}
    >
      <ContactlessIcon />
      <BottomNavigationActionLabel
        ownerState={ownerState}
      >
        <Link
          href={baseURL}
          style={{textDecoration: 'none', color: '#00000099'}}
        >
          Connect To Spotify
        </Link>
      </BottomNavigationActionLabel>
    </BottomNavigationActionRoot>
  );
});

export default SpotifyButton;
