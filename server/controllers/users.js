import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    console.log('123')
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    console.log('getUserFriends')
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

export const sendRemoveFriendRequest = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId)
    const isRequests = friend.requests.find(friendId => friendId === id)
    if(isRequests){
      console.log('1222')
      const findFriendIndex = await friend.requests.findIndex(friendId => friendId === id);
      friend.requests.splice(findFriendIndex, 1)
      const findUserIndex = await user.requested.findIndex(friendsId => friendsId === friendId)
      user.requested.splice(findUserIndex, 1);
      const savedUser = await user.save()
      await friend.save();
      console.log('userr',savedUser)
      res.status(200).json(savedUser)
    } else if(!isRequests){
      console.log('22222')
      friend.requests.push(id);
      user.requested.push(friendId);
      const savedFriend = await friend.save()
      const savedUser = await user.save()
      const userData = await User.findById(id);
      if(userData){
        console.log('savedUser',userData)
        res.status(200).json(userData)
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const removeFriend = async (req, res) => {
  try {
    console.log('123456');
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    const findFriendIndex = friend.friends.findIndex(friendId => friendId === id);
    friend.friends.splice(findFriendIndex, 1)
    const findUserIndex = user.friends.findIndex(friendsId => friendsId === friendId)
    user.friends.splice(findUserIndex, 1);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err.message)
  }
}

export const acceptRequest = async (req, res) => {
  try {
    console.log('12345')
    console.log(req.params)
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    user.friends.push(friendId);
    friend.friends.push(id);
    const findUserRequest = user.requests.findIndex(friendId => friendId === friendId);
    user.requests.splice(findUserRequest, 1)
    const findFriendRequestIndex = friend.requested.findIndex(friendsId => friendsId === id)
    friend.requested.splice(findFriendRequestIndex, 1);
    const updatedUser = await user.save();
    const updatedFriend = await friend.save()
    console.log('updated',updatedUser)
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message)
  }
}

export const blockUser = async (req, res) => {
  try {
    const { friendId, id } = req.params;
    const user = await User.findById(id);
    const check = user.blocked.find(id => id === friendId);
    console.log('check',check)
    if( check == undefined){
      user.blocked.push(friendId);
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } else if(check !== 'undefined') {
      const findUserIndex = user.blocked.findIndex(index => index === friendId)
      user.blocked.splice(findUserIndex, 1)
      const savedUser = await user.save()
      res.status(200).json(savedUser)
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const updateUser = async (req, res) => {
  try {
    console.log('12222222')
    const { userId } = req.params;
    console.log(req.body)
    const user = await User.findByIdAndUpdate(
      {_id:userId},
      {$set:{firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      location:req.body.location,
      picturePath:req.body.picturePath
    }})
    const savedUser = await user.save()
    console.log('savedUser',savedUser)
    res.status(200).json(savedUser)
  } catch (error) {
    console.log(error.message)
  }
}

export const beHost = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      {_id:userId},
      {$set:{company:req.body.company,
      service:req.body.service,
      hostVerification:req.body.hostVerification,
      status:"pending"
    }});
    const savedUser = await user.save()
    res.status(200).json(savedUser)
  } catch (error) {
    console.log(error.message)
  }
}

export const acceptHost = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      {_id:userId},
      {$set:{isHost:1,
      status:"Approved"
    }})
    await user.save()
    const savedUser = await User.find()
    res.status(200).json(savedUser)
    console.log("accept",savedUser)
  } catch (error) {
    console.log(error.message)
  }
}

export const rejectHost = async (req, res) => {
  try {
    console.log('1234')
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      {_id:userId},
      {$set:{
      status:""
    }})
    await user.save()
    const savedUser = await User.findById(userId)
    console.log('saved',savedUser)
    res.status(200).json(savedUser)
  } catch (error) {
    console.log(error.message)
  }
}