import { PrismaClient } from "@prisma/client";
import { cache } from "react";

export const getPrismaClient = cache(() => new PrismaClient());
