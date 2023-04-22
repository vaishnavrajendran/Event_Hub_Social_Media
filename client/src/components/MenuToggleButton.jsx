import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ReportIcon from '@mui/icons-material/Report';
import ExploreSharpIcon from '@mui/icons-material/ExploreSharp';
import { DeleteOutlined } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deletePosts, setPost, setUser } from 'state/index';
import { useNavigate } from 'react-router-dom';

const AccountMenu = ({postId, postUserId, picturePath, description}) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  const token = useSelector(state => state.token);
  // const { friends } = useSelector(state => state.user)
  // const { requested } = useSelector(state => state.user)
  const user = useSelector(state => state.user)
  const isFriend = user.friends.find((friend) => friend === postUserId);
  const isRequested = user.requested.find(friend => friend === postUserId)
  const { _id } = useSelector(state => state.user)
  const navigate = useNavigate();
 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async () => {
    const response = await fetch(`http://localhost:3001/posts/delete-post/${postId}`,
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

  const sendRemoveFriendRequest = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${postUserId}/add`,
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
      dispatch(setUser({data:updatedUser}))
    }
  }

  const removeFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${postUserId}/remove`,
    {
      method:"PATCH",
      headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          'Accept': 'application/json'
      }
    })
    const updatedUser = await response.json();
    if(updatedUser){
      dispatch(setUser({data:updatedUser}))
    }
  }

  const reportPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${_id}/${postId}/report`,
    {
      method:"PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    }).catch((error) => console.log(error.message))
    const report = await response.json();
    if(report){
      console.log("report",report)
      dispatch(setPost({post:report}));
    }
  }
  // const config = {
  //   headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //   }
  // }
  // const { data } = await axios.post(
  //   `http://localhost:3001/posts/${postId}/report`,
  //   config
  // ).catch((error) => {
  //   console.log(error.message)
  // })
  // if(data){
  //   dispatch(setReport({data:data}));
  // }

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
        {/* <MenuItem 
        onClick={() => {
          addRemoveFriend()
        }}>
         {isRequested &&  <Avatar/>}Remove Request
         {isFriend != 'undefined' && !isRequested && <Avatar/>}Add Friend
        </MenuItem> */}

        { _id !== postUserId && isFriend !== 'undefined' && !isRequested && <MenuItem onClick={() => {
          handleClose()
          sendRemoveFriendRequest()
        }}>
        <Avatar/>Add Friend 
        </MenuItem>}
        
        { _id !== postUserId && isRequested && <MenuItem onClick={() => {
          handleClose()
          sendRemoveFriendRequest()
        }}>
        <Avatar/> Remove Request 
        </MenuItem>}

        { _id !== postUserId && isFriend && <MenuItem onClick={() => {
          handleClose()
          removeFriend()
        }}>
        <Avatar/>Remove Friend 
        </MenuItem>}

        {postUserId === _id && <MenuItem onClick={() => {
          handleClose()
          deletePost()
        }}>
          <Avatar><DeleteOutlined/></Avatar>Delete
        </MenuItem>}

        {postUserId === _id && <MenuItem onClick={() => {
          handleClose()
          navigate('/checkout',{state:{
            picture:picturePath, desc:description, postID:postId
          }})
        }}>
          <Avatar><ExploreSharpIcon/></Avatar>Boost Post
        </MenuItem>}

        {postUserId === _id && <MenuItem onClick={() => {
          handleClose()
          navigate(`/edit-post/${postId}`,{state:{
            picture:picturePath, desc:description, postID:postId
          }})
        }}>
          <Avatar><ExploreSharpIcon/></Avatar>Edit Post
        </MenuItem>}

        {postUserId !== _id && <MenuItem onClick={() => {
          handleClose()
          reportPost()
        }}>           
        <Divider />
          <Avatar><ReportIcon/></Avatar>Report Post
        </MenuItem>}


        {/* <MenuItem onClick={handleClose}>
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
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
