import Comment from "../schema/comment";

// Create a comment (on a post or as a reply to another comment)
export const createComment = async ({ text, user, post, parentComment }) => {
  try {
    const newComment = await Comment.create({
      text,
      user,
      post,
      parentComment,
    });
    return newComment;
  } catch (error) {
    console.log(error);
  }
};

// Find all comments for a specific post
export const findCommentsByPostId = async (postId) => {
  try {
    const comments = await Comment.find({ post: postId }).populate("user");
    return comments;
  } catch (error) {
    console.log(error);
  }
};

// Find replies for a specific comment
export const findRepliesByCommentId = async (commentId) => {
  try {
    const replies = await Comment.find({ parentComment: commentId }).populate(
      "user"
    );
    return replies;
  } catch (error) {
    console.log(error);
  }
};

// Delete a comment by ID
export const deleteCommentById = async (id) => {
  try {
    const comment = await Comment.findByIdAndDelete(id);
    return comment;
  } catch (error) {
    console.log(error);
  }
};

// Update a comment by ID
export const updateCommentById = async (id, updatedObject) => {
  try {
    const comment = await Comment.findByIdAndUpdate(id, updatedObject, {
      new: true,
    });
    return comment;
  } catch (error) {
    console.log(error);
  }
};
