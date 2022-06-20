export const getStatus = async (res: any) => {
  res.status(200).json({ healthy: true });
};
