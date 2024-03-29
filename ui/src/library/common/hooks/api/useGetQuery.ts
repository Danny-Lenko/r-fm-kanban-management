// import axios from 'axios';
import axios from "../../../utilities/auth";
import { useQuery } from "@tanstack/react-query";

import { QueryData } from "../../../utilities";

const getData = async <T>(endpoint: string): Promise<T | undefined> => {
  console.log('Endpoint:', endpoint)
  try {
    const { data } = await axios.get<T>(endpoint);
    return data;
  } catch (err) {
    // console.error('An error occurred');
    throw new Error("Internal Server Error");
  }
};

export enum getQueryNames {
  boards = "boards",
  categories = "categories",
  boardDetails = "boardDetails",
  taskById = "taskById",
}

export function useGetQuery<T>(
  dataType: string,
  id?: string,
  useQueryConfig?: Record<string, string | number | boolean>
) {
  const Boards = new QueryData("boards", "/boards", ["boards"]);
  const Categories = new QueryData("categories", "/boards/by-categories", [
    "boards",
    "by-categories",
  ]);
  const DetailedBoard = new QueryData(
    "boardDetails",
    `/boards/${id!}/with-details`,
    ["boards", id!, "with-details"]
  );
  const TaskById = new QueryData("taskById", `tasks/${id}`, ["tasks", id!]);

  const getDataTypes = {
    boards: Boards,
    categories: Categories,
    boardDetails: DetailedBoard,
    taskById: TaskById,
  };

  const { key, endpoint } = getDataTypes[dataType as keyof typeof getDataTypes];

  if (!endpoint) {
    throw new Error(`Invalid dataType: ${dataType}`);
  }

  return useQuery(key, () => getData<T>(endpoint), useQueryConfig);
}
