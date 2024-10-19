  import AnimatePage from "@components/AnimatePage";
  import { useForm } from "react-hook-form";
  import Axios from "@hooks/Axios";
  import CustomerForm from "./CustomerForm";
  import { tableDataState ,totalRows} from "../../Store/TableData";
  import { customerDataFamily } from "../../Store/CustomerData";
  import { useRecoilState, useSetRecoilState } from "recoil";
  import notify from "../../utils/ToasterFunction";
  import { ToastContainer } from "react-toastify";
  import { emailSchema ,nameSchema,phoneNumberSchema,statusSchema,dobSchema} from "../../utils/inputValidations";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from 'yup'

  const schema = yup.object().shape({
    basic: yup.object().shape({
      Name: nameSchema.fields.name,
      email: emailSchema.fields.email,
      dob: dobSchema.fields.dob
    }),
    communicationStatus: yup.object().shape({
      status: statusSchema.fields.status
    })
  });
  const today = new Date().toISOString().split("T")[0];
  // (YYYY-MM-DDTHH:mm:ss.sssZ
  const Adduser = () => {
    const setTableState=useSetRecoilState(tableDataState);
    const [customerData,setCustomerData]=useRecoilState(customerDataFamily);
    const [tableRow,setTableRow]=useRecoilState(totalRows)
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
      resolver: yupResolver(schema)
    });
  const { register, handleSubmit, formState,reset} = form;
  const { errors ,isValid,isSubmitting,isDirty} = formState;
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
        setTableRow(prev=>prev+1)
        setCustomerData((prevData) => ({
          ...prevData,
          totalCustomers: prevData.totalCustomers + 1,
          activeCount: data.communicationStatus.status.toLowerCase() === 'active' ? prevData.activeCount + 1 : prevData.activeCount,
          males: data.basic.gender.toLowerCase() === 'male' ? prevData.males + 1 : prevData.males,
          females: data.basic.gender.toLowerCase() === 'female' ? prevData.females + 1 : prevData.females,
          havePhone: data.basic.primaryPhone ? prevData.havePhone + 1 : prevData.havePhone,
          communicationPreferences: {
            ...prevData.communicationPreferences,
            [data.communicationStatus.CommunicationPreferences.toLowerCase()]: (prevData.communicationPreferences[data.communicationStatus.CommunicationPreferences.toLowerCase()] || 0) + 1
          }
        }));

        notify({
          message:"Customer Added Successfully",
          position:'top-right',
          autocloseTime:1000,
          type:"success",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        reset()
      } 
    } catch (err) {
      console.error("Error adding user:", err);
      notify({
        message:err.response.data.message,
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
          isValid={!isValid}
          isSubmitting={isSubmitting}
          isDirty={!isDirty}
        />
      </AnimatePage>
    </>
  );
};

export default Adduser;
