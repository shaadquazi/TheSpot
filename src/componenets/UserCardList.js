import * as React from 'react';

import {styled} from '@mui/system';
import {Typography} from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ContactlessIcon from '@mui/icons-material/Contactless';
import LogoutIcon from '@mui/icons-material/Logout';

import CardList from './CardList';
import ListItem from './ListItem';

export default function UserCardList(props) {
  const {handleAddUsers, users, connected} = props;
  const [usersExists, setUsersExists] = React.useState(false);

  React.useEffect(() => {
    setUsersExists(Object.keys(users).length > 0);
  }, [users]);

  const UserList = styled(CardList)({
    maxHeight: '49.5vh',
  });

  const userBottomNavigation = (
    <BottomNavigation showLabels onChange={handleAddUsers}>
      <BottomNavigationAction label='Join Room' icon={<PlaylistAddIcon />} />
      {connected ? (
        <BottomNavigationAction label='Log out' icon={<LogoutIcon />} />
      ) : (
        <BottomNavigationAction
          label='Connect To Spotify'
          icon={<ContactlessIcon />}
        />
      )}
    </BottomNavigation>
  );

  return (
    <UserList
      elevation={2}
      headerText='Users Joined'
      BottomNavigation={userBottomNavigation}
    >
      {usersExists ? (Object.keys(users).map((key, index) => {
        const user = users[key];
        return <ListItem
          key={user.id}
          alt={user.display_name}
          src={user.url}
          title={user.display_name}
          caption='' />;
      })) : (
        <Typography>No users currently online</Typography>
      )}
    </UserList>
  );
}
