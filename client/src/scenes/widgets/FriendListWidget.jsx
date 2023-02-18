import React from 'react'
import { useSelector } from 'react-redux';
import AddFriends from './AddFriends';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const FriendListWidget = () => {
const { requests } = useSelector(state => state.user);
const allUsers = useSelector(state => state.allUsers);
const details = allUsers.filter(item => requests.includes(item._id));
console.log('details',details)
  return (
    <>
    {
      details.map(
        ({
          _id,
          firstName,
          lastName,
          occupation,
          picturePath
        }) => {
          <AddFriends
          key = {_id}
          firstName = { firstName }
          lastName = { lastName }
          occupation = { occupation }
          picturePath = { picturePath }
          />
        }
      )
    }
    </>
  )
}

export default FriendListWidget

