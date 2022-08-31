import * as React from 'react';

import {styled} from '@mui/system';
import {Typography} from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ContactlessIcon from '@mui/icons-material/Contactless';

import CardList from './CardList';
import ListItem from './ListItem';

export default function UserCardList(props) {
  const {handleAddUsers, users} = props;

  const UserList = styled(CardList)({
    maxHeight: '49.5vh',
  });

  const userBottomNavigation = (
    <BottomNavigation showLabels onChange={handleAddUsers}>
      <BottomNavigationAction
        label="Join Room"
        icon={<PlaylistAddIcon />} />
      <BottomNavigationAction
        label="Connect To Spotify"
        icon={<ContactlessIcon />} />
    </BottomNavigation>
  );

  return (
    <UserList
      elevation={2}
      headerText="Users Joined"
      BottomNavigation={userBottomNavigation}
    >
      {users.length >= 1 ? (
        users.map((user) => <ListItem key={user.id} props={user} />)
      ) : (
        <Typography>No users currently online</Typography>
      )}
    </UserList>
  );
}
