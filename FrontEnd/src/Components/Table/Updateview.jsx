import AnimatePage from "@components/AnimatePage";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "@hooks/Axios";
import { tableDataState } from "../../Store/TableData";
import { useRecoilState } from "recoil";
import CustomerForm from "../../Pages/AddUser/CustomerForm";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import notify from "../../Utils/ToasterFunction";
import { useSetRecoilState } from "recoil";
import { customerDataFamily } from "../../Store/CustomerData";
import {
  emailSchema,
  nameSchema,
  phoneNumberSchema,
  statusSchema,
  dobSchema,
} from "../../utils/inputValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const today = new Date().toISOString().split("T")[0];
const formatDateForInput = (dateString) => {
  if (!dateString) {
    return "";
  }
  const d = new Date(dateString);
  return d.toISOString().split("T")[0];
};
const schema = yup.object().shape({
  basic: yup.object().shape({
    Name: nameSchema.fields.name,
    email: emailSchema.fields.email,
    primaryPhone: phoneNumberSchema.fields.phoneNumber,
    dob: dobSchema.fields.dob,
  }),
  communicationStatus: yup.object().shape({
    status: statusSchema.fields.status,
  }),
});
const UpdateView = () => {
  const [tabledata, setTableState] = useRecoilState(tableDataState);
  const { id } = useParams();
  const path = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const localData = tabledata.find((item) => item._id === id);
  const setCustomerDataFamily = useSetRecoilState(customerDataFamily);
  
  // implement usequery to fetch data
  const {
    data: customerData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customerData", id],
    queryFn: async () => {
      const response = await Axios({
        requestType: "get",
        url: `/get-single-customer/${id}`,
      });
      if (response.status === 200) {
        return response.data.data;
      }
    },
    enabled: !localData,
    staleTime: 600000,
  });

  // if data in state exist then use it instead of data from api
  const formData = localData || customerData;
  // update customer stats when update hadnler call
  const updateCustomerData = useCallback((data) => {
    setCustomerDataFamily((prevData) => {

        const { CommunicationPreferences: newPreferences, status: newStatus } = data.communicationStatus;
        const { gender: newGender } = data.basic;
        
        const prevPreferences  = formData.customerCommunicationPreference;
        const prevStatus = formData.customerStatus;
        const prevGender  = formData.gender;

        const updatedMales = (newGender=='male'&& prevGender!='male') ? prevData.males+1 : (newGender!='male' && prevGender=='male')? prevData.males-1 : prevData.males
        const updatedFemales = (newGender == 'female' && prevGender != 'female') ? prevData.females + 1 : (newGender !== 'female' && prevGender === 'female') ? prevData.females - 1 : prevData.females;
        const updatedActiveCount = (newStatus == 'active' && prevStatus != 'active') ? prevData.activeCount + 1 : (newStatus !== 'active' && prevStatus === 'active') ? prevData.activeCount - 1 : prevData.activeCount;
        const updatedCommunicationPreferences = newPreferences != prevPreferences 
          ? { ...prevData.communicationPreferences, 
                [newPreferences]:(prevData.communicationPreferences[newPreferences] || 0)+1,
              [prevPreferences]:prevData.communicationPreferences[prevPreferences]-1,
          }
          : prevData.communicationPreferences;
        return {
          ...prevData,
          totalCustomers: prevData.totalCustomers,
          havePhone: prevData.havePhone,
          males: updatedMales,
          females: updatedFemales,
          activeCount: updatedActiveCount,
          communicationPreferences: updatedCommunicationPreferences,
        };
      })
  }, [formData]);



  // initalizin form
  const form = useForm({
    defaultValues: {
          basic: {
            Name: formData?.fullName || "",
            email: formData?.email || "",
            gender: formData?.gender || "",
            dob: formatDateForInput(formData?.dob) || "",
            primaryPhone: formData?.primaryPhone || "",
            alternativePhone: formData?.alternativePhone || "",
          },
          address: {
            address1: formData?.address?.address1 || "",
            address2: formData?.address?.address2 || "",
            city: formData?.address?.city || "",
            state: formData?.address?.state || "",
            country: formData?.address?.country || "",
            zipCode: formData?.address?.zipCode || "",
          },
          communicationStatus: {
            CommunicationPreferences:
              formData?.customerCommunicationPreference || "",
            status: formData?.customerStatus || "",
          },
          company: {
            name: formData?.customerCompanyName || "",
            JobTitle: formData?.customerJobTitle || "",
          },
          Additional: {
            Notes: formData?.additionalInfoNote || "",
            SourceofLead: formData?.additionalInfoSourceOfLead || "",
          },
        },
    resolver: yupResolver(schema),
  });
  //destructuring form
  const { register, handleSubmit, formState, getValues,control ,reset} = form;
  const { errors, isValid, isSubmitting, isDirty } = formState;
  //form submit handler
  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        requestType: "put",
        url: "/update-customer-info",
        data: {
          id,
          newData: data,
        },
      });
      if (response.status === 200) {
        setTableState((prev) =>
          prev.map((item) =>
            item._id === id ? { ...response.data.data } : item
          )
        );
        updateCustomerData(data);

        notify({
          message: "Customer Information Updated Successfully",
          position: "top-right",
          autocloseTime: 3000,
          type: "success",
          theme: `${
            localStorage.getItem("theme") == "false" ? "light" : "dark"
          }`,
        });
        navigate("/home/CustomerList");
      }
    } catch (error) {
      notify({
        message: ` ${error?.response?.data?.message}`,
        position: "top-right",
        autocloseTime: 3000,
        type: "error",
        theme: `${localStorage.getItem("theme") == "false" ? "light" : "dark"}`,
      });
      console.error("Error updating customer:", error);
    }
  };
  // implement use effect to populate fields when there data get from api call
  useEffect(() => {
    if (customerData) {
      reset({
        basic: {
          Name: customerData.fullName || "",
          email: customerData.email || "",
          gender: customerData.gender || "",
          dob: formatDateForInput(customerData.dob) || "",
          primaryPhone: customerData.primaryPhone || "",
          alternativePhone: customerData.alternativePhone || "",
        },
        address: {
          address1: customerData.address?.address1 || "",
          address2: customerData.address?.address2 || "",
          city: customerData.address?.city || "",
          state: customerData.address?.state || "",
          country: customerData.address?.country || "",
          zipCode: customerData.address?.zipCode || "",
        },
        communicationStatus: {
          CommunicationPreferences:
            customerData.customerCommunicationPreference || "",
          status: customerData.customerStatus || "",
        },
        company: {
          name: customerData.customerCompanyName || "",
          JobTitle: customerData.customerJobTitle || "",
        },
        Additional: {
          Notes: customerData.additionalInfoNote || "",
          SourceofLead: customerData.additionalInfoSourceOfLead || "",
        },
      });
    }
  }, [customerData]);
  const isViewModelOnly = path.includes("View");
  if (isLoading) {
    return (
      <div className="loader absolute left-[50%] top-[50]">
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <p>Error loading customer data: {error.message}</p>
      </div>
    );
  }

  return (
    <AnimatePage>
      <ToastContainer />
      {path && (
        <h1 className="text-center font-bold text-2xl py-1">
          {isViewModelOnly
            ? "View Customer Data"
            : "Update Customer Information"}
        </h1>
      )}
      {!isLoading && !error && formData && (
        <CustomerForm
          today={today}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          path={path}
          register={register}
          errors={errors}
          isViewModelOnly={isViewModelOnly}
          isValid={!isValid}
          isSubmitting={isSubmitting}
          isDirty={!isDirty}
        />
      )}
    </AnimatePage>
  );
};

export default UpdateView;
