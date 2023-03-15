
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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { setPost, updateReportedPosts } from 'state';

export default function MenuReportToggle(postId, postUserId) {
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

  const reportedPosts = useSelector(state => state.reportedPosts);
  const currPost = reportedPosts.filter(post => post._id === postId.postId)

  const postID = postId.postId
  const blockPost = async (req, res) => {
    const response = await fetch(`http://localhost:3001/admin/${postID}/blockPost`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }, 
    });
    const data = await response.json();
    dispatch(setPost({ post: data }));
    dispatch(updateReportedPosts({ post : data}))
  }

  const removeReport = async (req, res) => {
    const response = await fetch(`http://localhost:3001/admin/${postID}/removeReport`,
    {
      method:"PATCH",
      headers: { Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPost({ post: data }));
    dispatch(updateReportedPosts({ post : data}))
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
        {/* <MenuItem onClick={() => {
          blockUser()
          handleClose()
        }}>
          <Avatar><BlockOutlinedIcon/></Avatar> Block User
        </MenuItem> */}
        <MenuItem onClick={() => {
          blockPost()
          handleClose()
        }}>
          <Avatar><BlockOutlinedIcon/></Avatar> {currPost[0].adminBlocked === true ? "Unblock Post" : "Block Post"}
        </MenuItem>
        <MenuItem onClick={() => {
          removeReport()
          handleClose()
        }}>
          <Avatar><RemoveCircleOutlineIcon/></Avatar> Remove Report
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