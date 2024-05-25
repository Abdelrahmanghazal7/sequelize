import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";
import postModel from "./post.model.js";

const commentModel = sequelize.define("comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

commentModel.belongsTo(userModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

userModel.hasMany(commentModel, {
  foreignKey: "userId",
});

commentModel.belongsTo(postModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

postModel.hasMany(commentModel, {
  foreignKey: "postId",
});

export default commentModel;
