import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("mysql://uy4x65gktjj8effw:oQVNVJ00TfN2eIBKUyKU@bvq6ytfpgipz08mitycn-mysql.services.clever-cloud.com:3306/bvq6ytfpgipz08mitycn");

const connectionDB = async () => {
  return await sequelize.sync({ alter: false, force: false });
};

export default connectionDB;
