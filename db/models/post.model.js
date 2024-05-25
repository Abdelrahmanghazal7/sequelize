import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";

const postModel = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

postModel.belongsTo(userModel, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

userModel.hasMany(postModel, {
  foreignKey: "authorId",
});

export default postModel;
