import Like from "../schema/like";

// Create a like (for either a post or a comment)
export const createLike = async ({ user, post, comment }) => {
  try {
    const newLike = await Like.create({ user, post, comment });
    return newLike;
  } catch (error) {
    console.log(error);
  }
};

// Find all likes for a specific post or comment
export const findLikesByTarget = async ({ postId, commentId }) => {
  try {
    const likes = await Like.find({
      ...(postId && { post: postId }),
      ...(commentId && { comment: commentId }),
    });
    return likes;
  } catch (error) {
    console.log(error);
  }
};

// Count likes for a specific post or comment
export const countLikesByTarget = async ({ postId, commentId }) => {
  try {
    const count = await Like.countDocuments({
      ...(postId && { post: postId }),
      ...(commentId && { comment: commentId }),
    });
    return count;
  } catch (error) {
    console.log(error);
  }
};

// Delete a like by ID
export const deleteLikeById = async (id) => {
  try {
    const like = await Like.findByIdAndDelete(id);
    return like;
  } catch (error) {
    console.log(error);
  }
};
