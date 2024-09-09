import { useQuery } from "@tanstack/react-query"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {paginationState,tableDataState} from '../../Store/TableData'
import Axios from "@hooks/Axios"
const Query = () => {
    const [pagination,setPagionationState]=useRecoilState(paginationState);
    const [tableData,setTableData]=useRecoilState(tableDataState);
    const query=useQuery({
        queryKey:["tabledata",pagination.pageIndex+1,pagination.pageSize],
        queryFn:async()=>{
            const response=await Axios({
                requestType:'get',
                url:`/get-customer?page=${pagination.pageIndex+1}&limit=${pagination.pageSize}`
            })
            if(response.status==200){
                setTableData((prev)=>{
                    return [...prev,...response.data.data]
                })
                
                return response.data
            }
        },
        staleTime:30000,
        enabled: !tableData.length || pagination.pageIndex > 0 

    })
    return query
}

export default Query