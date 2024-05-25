import commentModel from "../../../db/models/comment.model.js";

// =========================================== CREATE COMMENT ===========================================

export const addComment = async (req, res) => {
  const { content, userId, postId } = req.body;

  if (!content || !userId || !postId) {
    return res
      .status(400)
      .json({ msg: "content, userId, and postId are required" });
  }

  try {
    const comment = await commentModel.create({ content, userId, postId });

    res.status(201).json({ msg: "comment created", comment });
  } catch (error) {
    res.status(404).json({ msg: "user or post not found" });
  }
};

// =========================================== READ COMMENTS ===========================================

export const getComments = async (req, res) => {
  const comments = await commentModel.findAll();
  res.status(200).json(comments);
};

// =========================================== UPDATE COMMENT ===========================================

export const updateComment = async (req, res) => {
  const { userId, postId, content } = req.body;

  const comment = await commentModel.update(
    { content },
    {
      where: {
        userId,
        postId,
      },
    }
  );

  if (!comment[0]) {
    return res.status(404).json({ msg: "comment not found" });
  }

  res.status(201).json({ msg: "Comment updated", comment });
};

// =========================================== DELETE COMMENT ===========================================

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  const comment = await commentModel.destroy({
    where: {
      id,
    },
  });
  if (!comment) {
    return res.status(404).json({ msg: "comment not found" });
  }
  res.status(201).json({ msg: "Comment deleted", comment });
};
