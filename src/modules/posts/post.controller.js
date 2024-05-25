import postModel from "../../../db/models/post.model.js";
import userModel from "../../../db/models/user.model.js";

// =========================================== CREATE POST ===========================================

export const addPost = async (req, res) => {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res
      .status(400)
      .json({ msg: "Title, content, and authorId are required" });
  }

  try {
    const post = await postModel.create({ title, content, authorId });

    res.status(201).json({ msg: "Post created", post });
  } catch (error) {
    res.status(404).json({ msg: "user not found" });
  }
};

// =========================================== READ POSTS ===========================================

export const getPosts = async (req, res) => {
  const posts = await postModel.findAll();
  res.status(200).json(posts);
};

// =========================================== GET SPECIFIC POST WITH AUTHOR ===========================================

export const getPostWithAuthor = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findByPk(postId, {
      include: {
        model: userModel,
        attributes: ["id", "userName", "email"],
      },
    });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: "Error getting post with author", error });
  }
};

// =========================================== UPDATE POST ===========================================

export const updatePost = async (req, res) => {
  const { id, title, content } = req.body;

  const post = await postModel.update(
    { title, content },
    {
      where: {
        id,
      },
    }
  );

  if (!post[0]) {
    return res.status(404).json({ msg: "post not found" });
  }

  res.status(201).json({ msg: "Post updated", post });
};

// =========================================== DELETE POST ===========================================

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await postModel.destroy({
    where: {
      id,
    },
  });
  if (!post) {
    return res.status(404).json({ msg: "post not found" });
  }
  res.status(201).json({ msg: "Post deleted", post });
};
