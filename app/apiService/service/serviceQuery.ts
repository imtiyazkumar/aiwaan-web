/**
 * Project Aiwaan
 *
 * @author     Imtiyaz Ahmad
 * @copyright  Imtiyaz Ahmad
 *
 * Built by Imtiyaz Ahmad
 * @link https://aiwaan.in
 *
 */

import { useQuery } from "@tanstack/react-query";
import ServiceAPI from "./serviceAPI";
import type { ISearchSortFilter } from "../../utils";

export const enum Service_Query_Key {
    SERVICE = "service",
}

const useQueryGetServices = (params: ISearchSortFilter) => {
    return useQuery({
        queryKey: [Service_Query_Key.SERVICE, params],
        queryFn: () => ServiceAPI.getAll(params),
    });
};

export default {
    useQueryGetServices,
};
