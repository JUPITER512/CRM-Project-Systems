import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { paginationState, tableDataState } from "../../Store/TableData";
import Axios from "@hooks/Axios";
import { useEffect } from "react";
const Query = () => {
  const [pagination, setPagionationState] = useRecoilState(paginationState);
  const [tableData, setTableData] = useRecoilState(tableDataState);
  
  const onSuccess = (data) => {
    setTableData((prev) => [...prev, ...data]);
  };

  const query = useQuery({
    queryKey: ["tabledata", pagination.pageIndex + 1, pagination.pageSize],
    queryFn: async () => {
      const response = await Axios({
        requestType: "get",
        url: `/get-customer?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
      });
      if (response.status === 200) {
        onSuccess(response.data.data);
        return response.data;
      }
    },
    staleTime: 30000,
    enabled: !tableData.length || pagination.pageIndex > 0,
    placeholderData: (prevData) => prevData || [], // Keep previous data while fetching
  });

  return query;
};

export default Query;
