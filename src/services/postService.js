import { createPost } from "../repositories/postRepository";

export const createPostService = async (createPostObject) => {
  const image = createPostObject.image;
  const caption = createPostObject.caption?.trim();
  //   const user = createPostObject.user;
  const post = await createPost(caption, image);
  return post;
};
