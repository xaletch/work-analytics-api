import { User } from "@/models";

export const getUser = async (id: number) => {
  try {
    const user = await User.findOne({ where: { id } });

    return user;
  }
  catch (err) {
    console.log(`Ошибка при получении пользователя ${err}`);
    throw err;
  }
}