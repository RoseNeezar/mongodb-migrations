import path from "path";
import UserModel, { UserAttr } from "../models/user.model";
import {
  hasMigrationExecuted,
  removeMigration,
  saveMigration,
} from "../util/migration.util";

const migrationName = path.basename(__filename);

const users: UserAttr[] = [
  { email: "user1@example.com", password: "password1", nickname: "User1" },
  { email: "user2@example.com", password: "password2", nickname: "User2" },
  {
    email: "user10@example.com",
    password: "password10",
    nickname: "User10",
  },
];

// up -  add data to the db
export const up = async () => {
  try {
    if (await hasMigrationExecuted(migrationName)) {
      console.log("migration has run:", migrationName);
      return;
    }
    for (const userAttr of users) {
      const exist = await UserModel.findOne({
        email: userAttr.email,
      });
      if (!exist) {
        await UserModel.create(userAttr);
      }
    }

    await saveMigration(migrationName);
  } catch (error) {}
};
//down - remove data from db
export const down = async () => {
  try {
    if (!(await hasMigrationExecuted(migrationName))) {
      console.log("migration has not run:", migrationName);
      return;
    }

    for (const userAttr of users) {
      const exist = await UserModel.findOne({
        email: userAttr.email,
      });
      if (exist) {
        await UserModel.deleteOne({
          _id: exist._id,
        });
      }
    }

    await removeMigration(migrationName);
  } catch (error) {}
};
