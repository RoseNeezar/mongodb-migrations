import MigrationModel from "../models/migration.model";

//has migration
export const hasMigrationExecuted = async (migrationName: string) => {
  const exist = await MigrationModel.findOne({
    name: migrationName,
  });
  return !!exist;
};
//save migration
export const saveMigration = async (migrationName: string) => {
  await MigrationModel.create({
    name: migrationName,
    excutedAt: new Date(),
  });
};
//remove migration
export const removeMigration = async (migrationName: string) => {
  const existMigration = await MigrationModel.findOne({
    name: migrationName,
  });
  if (existMigration) {
    await MigrationModel.deleteOne({
      _id: existMigration._id,
    });
  }
};
