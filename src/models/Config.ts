import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

const configSchema = createSchema(
  {
    key: Type.string({ required: true, trim: true, unique: true }),
    value: Type.mixed(),
  },
  { versionKey: false, timestamps: true },
);

type ConfigDoc = ExtractDoc<typeof configSchema>;


const ConfigModel = typedModel(
  'Config',
  configSchema,
  undefined,
  undefined,
  {
    findByKey(key: string): ConfigDoc {
      return this.findOne({ key })
    },
    findByKeyAndUpdate(key: string, value: any): ConfigDoc {
      const config = this.findOneAndUpdate({ key }, { value })
      return config
    }
  }
);

export { configSchema, ConfigModel };
