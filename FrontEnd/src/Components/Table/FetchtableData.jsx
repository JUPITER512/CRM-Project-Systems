import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  paginationState,
  tableDataState,
  totalRows,
} from "../../Store/TableData";
import Axios from "@hooks/Axios";

const Query = () => {

  const pagination = useRecoilValue(paginationState);
  const [tableData, setTableData] = useRecoilState(tableDataState);
  const setTotalRows = useSetRecoilState(totalRows);
  const fetchTableData = async () => {
    const response = await Axios({
      requestType: "get",
      url: `/get-customer?page=${pagination.pageIndex + 1}&limit=${
        pagination.pageSize
      }`,
    });
    if (response.status === 200) {
      
      setTableData((prev) => {
        const previousData = [...prev];
        const newData = previousData.concat([...response.data.data]);
        // const newData = [...previousData, ...response.data.data];
        const filteredData = newData.filter((item, index, array) => {
          return (
            array.findIndex((otherItem) => otherItem._id === item._id) === index
          );
        });
        return filteredData;
      });

      setTotalRows(parseInt(response.data.totalCustomers));
      return response.data;
    }
  };
  const query = useQuery({
    queryKey: ["tabledata", pagination?.pageIndex + 1, pagination?.pageSize],
    queryFn: fetchTableData,
    staleTime: 1800000,
    enabled: true,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });
  return query;
};

export default Query;
