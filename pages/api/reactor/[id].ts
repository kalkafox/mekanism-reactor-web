// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ data: "Missing id" });
  }
  const response = await fetch(`http://135.148.130.171:8081/${id}`);
  const data = await response.json();
  res.status(200).json({ data: data });
};

export default handler;
