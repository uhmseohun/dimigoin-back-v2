import { ConfigModel } from "../models";
import { IConfig } from "../interfaces";

export const getConfig = async () => {
  const config: IConfig = {};
  const configs = await ConfigModel.find();
  configs.forEach(v => {
    config[v.key] = v.value;
  });
  return config;
};
