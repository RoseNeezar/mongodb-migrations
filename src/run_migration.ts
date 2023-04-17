import glob from "glob";
import { dbConnect } from "./util/dbConnect";
import path from "path";
import mongoose from "mongoose";

const runMigration = async () => {
  try {
    const migrationFiles = glob.sync("src/migrations/*.ts");
    await dbConnect;

    for (const migrationFile of migrationFiles) {
      const migration = await import(path.resolve(migrationFile));

      if (typeof migration.up === "function") {
        await migration.up();
        console.log("Up migration executed: ", migrationFile);
      } else {
        console.log("Up migration function not found: ", migrationFile);
      }
    }

    await mongoose.connection.close();
  } catch (error) {}
};

runMigration();
