import AnimatePage from "@components/AnimatePage";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import Axios from "@hooks/Axios";
import CustomerForm from "./CustomerForm";
import { tableDataState } from "../../Store/TableData";
import { customerDataFamily } from "../../Store/CustomerData";
import { useRecoilState, useSetRecoilState } from "recoil";
import notify from "../../utils/ToasterFunction";
import { ToastContainer } from "react-toastify";
const today = new Date().toISOString().split("T")[0];

const Adduser = () => {
  const setTableState=useSetRecoilState(tableDataState);
  const [customerData,setCustomerData]=useRecoilState(customerDataFamily)
  const form = useForm({
    defaultValues: {
      basic: {
        Name:  "",
        email:  "",
        gender:  "",
        dob:  "",
        primaryPhone:"",
        alternativePhone: "",
      },
      address: {
        address1: "",
        address2:"",
        city: "",
        state:  "",
        country:  "",
        zipCode: "",
      },
      communicationStatus: {
        CommunicationPreferences:"",
        status:"",
      },
      company: {
        name: "",
        JobTitle: "",
      },
      Additional: {
        Notes:"",
        SourceofLead: "",
      },
    },
  });

  const { register, handleSubmit, formState, reset ,setValue,getValues} = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        requestType: "post",
        url: "/add-customer",
        data: data,
      });
      if (response.status === 200) {
        setTableState((prev)=>{
          return [response.data.customer,...prev]
        })

        setCustomerData(prevData => ({
          ...prevData,
          totalCustomers: prevData.totalCustomers + 1,
        }));
        notify({
          message:"Customer Added Successfully",
          position:'top-right',
          autocloseTime:3000,
          type:"success",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        // reset();
      } else {
        console.error("Failed to add user:", response.status);
      }
    } catch (err) {
      console.error("Error adding user:", err);
      notify({
        message:`Error While adding customer ${err.message}`,
        position:'top-right',
        autocloseTime:3000,
        type:"error",
        theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
      })
    }
  };


  return (
    <>
      <ToastContainer />

      <AnimatePage>
        <CustomerForm
          today={today}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
        />
      </AnimatePage>
    </>
  );
};

export default Adduser;
