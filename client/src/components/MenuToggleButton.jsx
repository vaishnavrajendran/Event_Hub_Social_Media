import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { DeleteOutlined } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deletePosts, setUser } from 'state/index'

const AccountMenu = ({postId, postUserId}) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  const token = useSelector(state => state.token);
  const friends = useSelector(state => state.user.friends)
  const isFriend = friends.find((friend) => friend._id === postUserId);
  const { _id } = useSelector(state => state.user)


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async () => {
    let postIds = postId.postId;
    const response = await fetch(`http://localhost:3001/posts/delete-post/${postIds}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const target = await response.json();
    if(target){
      const updatedPosts = posts.filter((post) => (
        post._id  !== target
      ))
      dispatch(deletePosts({remainingPosts:updatedPosts}))
    }
  }

  const addRemoveFriend =async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${postUserId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
    }).catch((err) => console.log(err.message))
    
    const updatedUser = await response.json();
    if(updatedUser){
      console.log('user',updatedUser)
      dispatch(setUser({data:updatedUser}))
    }
  }


  // const patchFriend = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/users/${_id}/${friendId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setFriends({ friends: data }));
  // };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon sx={{ width: 32, height: 32 }}></MenuIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu 
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
        onClick={() => {
          addRemoveFriend()
          handleClose()
        }}>
          <Avatar /> {isFriend? "Remove Friend" : "Add Friend" }
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          deletePost()
        }}>
          <Avatar><DeleteOutlined/></Avatar>Delete
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
