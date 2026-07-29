import prisma from "../config/prisma";

export const getTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createTask = async (title: string) => {
  return prisma.task.create({
    data: {
      title,
    },
  });
};