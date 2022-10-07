import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

interface ResortArray {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}
type Data = {
  resort: ResortArray;
};
type ErrorData = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const { id } = req.query;

  try {
    const jsonDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.readFile(
      jsonDirectory + "/data.json",
      "utf8"
    );
    let json_data = JSON.parse(fileContents);

    res.status(200).json({
      resort: json_data.find((item: ResortArray) => item.id === Number(id)),
    });
  } catch (error) {
    res.status(500).json({ error: "Error reading data" });
  }
}
