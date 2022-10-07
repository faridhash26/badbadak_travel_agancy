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
  resorts: Array<ResortArray>;
  total: number;
  total_page: number;
  page_number: number;
};
type ErrorData = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const query = req.query;
  const { page, limit, sort_title, sort_price } = query;

  try {
    const jsonDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.readFile(
      jsonDirectory + "/data.json",
      "utf8"
    );
    let json_data = JSON.parse(fileContents);

    let sorted_data = sortingData(
      json_data,
      sort_title as string,
      sort_price as string
    );

    let paginated_json_data =
      limit && page
        ? paginate(sorted_data, Number(limit), Number(page))
        : json_data;

    const theData = {
      resorts: paginated_json_data,
      total: json_data.length,
      total_page: json_data.length / 10,
      page_number: Number(page),
    };
    res.status(200).json(theData);
  } catch (error) {
    res.status(500).json({ error: "Error reading data" });
  }
}

const sortingData = (
  data: Array<any>,
  sort_title: string,
  sort_price: string
) => {
  if (sort_price === "true" && sort_title === "true") {
    let new_data = data.sort((a, b) => {
      return (
        a.title.localeCompare(b.title) ||
        parseInt(b.price, 10) - parseInt(a.price, 10)
      );
    });

    return new_data;
  }
  if (sort_price === "true") {
    let new_data = data.sort((a, b) =>
      parseInt(a.price, 10) < parseInt(b.price, 10) ? 1 : -1
    );
    return new_data;
  }

  return data;
};
const paginate = (array: Array<any>, pageSize: number, pageNumber: number) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
