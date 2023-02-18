import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
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

export const addFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId)
    const isFriend = friend.friends.find(friendId => friendId._id == id)
    if(isFriend){
      console.log('1222')
      const findFriendIndex = await friend.friends.findIndex(friendId => friendId._id === id);
      friend.friends.splice(findFriendIndex, 1)
      const findUserIndex = await user.friends.findIndex(friendsId => friendsId._id === friendId)
      user.friends.splice(findUserIndex, 1);
      const savedUser = await user.save()
      console.log(savedUser)
      res.send(200).json(savedUser)
    } else if(!isFriend){
      console.log('22222')
      friend.requests.push(id);
      user.requested.push(friendId);
      const savedFriend = await friend.save()
      const savedUser = await user.save()
      const userData = await User.findById(id);
      if(userData){
        console.log(userData)
        res.json(userData)
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}
