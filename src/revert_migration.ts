import glob from "glob";
import { dbConnect } from "./util/dbConnect";
import path from "path";
import mongoose from "mongoose";

const revertMigration = async () => {
  try {
    const migrationFiles = glob.sync("src/migrations/*.ts");
    await dbConnect;

    for (const migrationFile of migrationFiles) {
      const migration = await import(path.resolve(migrationFile));

      if (typeof migration.down === "function") {
        await migration.down();
        console.log("Down migration executed: ", migrationFile);
      } else {
        console.log("Down migration function not found: ", migrationFile);
      }
    }

    await mongoose.connection.close();
  } catch (error) {}
};

revertMigration();
