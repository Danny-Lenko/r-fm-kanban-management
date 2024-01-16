import axios from "../../../utilities/auth";
import { useMutation } from "@tanstack/react-query";

import { QueryData } from "../../../utilities";

const putData = async <T, R>(
  endpoint: string,
  bodyReq: T
): Promise<R | undefined> => {
  try {
    const { data } = await axios.put<R>(endpoint, bodyReq);
    return data;
  } catch (err) {
    console.error("An error occurred");
    throw new Error("Internal Server Error");
  }
};

export enum putQueryNames {
  editTaskById = "editTaskById",
  updateBoardById = "updateBoardById",
}

export function usePutQuery<T, R>(
  dataType: keyof typeof postDataTypes,
  id: string
) {
  const EditTaskById = new QueryData("editTaskById", `/tasks/edit/${id}`, [
    "tasks",
    "edit",
    id!,
  ]);

  const UpdateBoardById = new QueryData("updateBoardById", `/boards/${id}`, [
    "boards",
    id,
  ]);

  const postDataTypes = {
    editTaskById: EditTaskById,
    updateBoardById: UpdateBoardById,
  };

  const { endpoint } = postDataTypes[dataType];

  if (!endpoint) {
    throw new Error(`Invalid dataType: ${dataType}`);
  }

  return useMutation((bodyReq: T) => putData<T, R>(endpoint, bodyReq));
}
