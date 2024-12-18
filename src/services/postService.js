import {
  countAllPosts,
  createPost,
  DeletePostById,
  findAllPosts,
  findPostById,
  updatePostById,
} from "../repositories/postRepository";

export const createPostService = async (createPostObject) => {
  const image = createPostObject.image;
  const caption = createPostObject.caption?.trim();
  const user = createPostObject.user;
  const post = await createPost(caption, image, user);
  return post;
};

export const getAllPostsServices = async (offset, limit) => {
  const posts = await findAllPosts(offset, limit);

  const totalDocuments = await countAllPosts();

  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    posts,
    totalPages,
    totalDocuments,
  };
};

export const deletePostService = async (id, user) => {
  const post = await findPostById(id);

  if (post.user != user) {
    throw {
      status: 401,
      message: "Unauthorized",
    };
  }
  const response = await DeletePostById(id);
  return response;
};

export const updatePostService = async (id, updatedObject) => {
  const response = await updatePostById(id, updatedObject);
  return response;
};
