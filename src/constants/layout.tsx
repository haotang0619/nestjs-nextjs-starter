export const serverEnv = process.env.NEXT_PUBLIC_SERVER_ENV;
export const isNotProd = serverEnv !== 'prod';

export const GENERAL_Z_INDEX = {
  IN_FRONT_LEVEL_1: 10,
  IN_FRONT_LEVEL_2: 20,
  IN_FRONT_LEVEL_3: 30,
  IN_FRONT_LEVEL_4: 40,
  IN_FRONT_LEVEL_5: 50,
  MODAL: 8000,
  POPOVER: 9000,
};
