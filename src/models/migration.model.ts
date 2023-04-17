import { Document, Schema, model, Model } from "mongoose";

export interface MigrationAttrs {
  name: string;
  excutedAt: string;
}
interface IMigration extends MigrationAttrs, Document {}

const MigrationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  excutedAt: { type: String, required: true },
});

const MigrationModel: Model<IMigration> = model<IMigration>(
  "migrations",
  MigrationSchema
);

export default MigrationModel;
