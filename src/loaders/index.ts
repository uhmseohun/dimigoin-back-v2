import express from "express";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import apolloLoader from "./apollo";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();

  await apolloLoader({ app: expressApp });

  await expressLoader({ app: expressApp });
};
