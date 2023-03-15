
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
import { DeleteOutlined, Report } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { setReportedUsers, setUser, updateAllUsers } from 'state';

export default function AccountMenu(userId) {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  const token = useSelector(state => state.token);
  const { _id } = useSelector(state => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async () => {
    // let postIds = postId.postId;
    // const response = await fetch(`http://localhost:3001/posts/delete-post/${postIds}`,
    //   {
    //     method: "PATCH",
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // )
    // const target = await response.json();
    // if(target){
    //   const updatedPosts = posts.filter((post) => (
    //     post._id  !== target
    //   ))
    //   dispatch(deletePosts({remainingPosts:updatedPosts}))
    // }
  }
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id === userId);
  const blocked = useSelector(state => state.user.blocked);
  const isBlocked = blocked.find(friend => friend === userId.userId);

  const userID = userId.userId;
  const blockUser = async (req, res) => {
    const response = await fetch(`http://localhost:3001/users/${userID}/${_id}/block`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }, 
    });
    const data = await response.json();
    dispatch(setUser({ data: data }));
  }

  const reportUser = async (req, res) => {
    const response = await fetch(`http://localhost:3001/users/${userID}/${_id}/report-user`,
    {
      method:"PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(updateAllUsers({user:data}))
  }

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
        <MenuItem onClick={() => {
          blockUser()
          handleClose()
        }}>
          <Avatar><BlockOutlinedIcon/></Avatar> {isBlocked == undefined ? "Block User" : "Unblock User"}
        </MenuItem>
        <MenuItem onClick={() => {
          reportUser()
          handleClose()
        }}>
          <Avatar><Report/></Avatar>Report User
        </MenuItem>
        <MenuItem onClick={() => {
          deletePost()
          handleClose()
        }}>
          <Avatar><DeleteOutlined/></Avatar>{isFriend ? "Remove Friend" : "Send Request" }
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