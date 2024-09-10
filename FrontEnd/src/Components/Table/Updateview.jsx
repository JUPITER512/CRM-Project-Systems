import AnimatePage from "@components/AnimatePage";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "@hooks/Axios";
import { tableDataState } from "../../Store/TableData";
import { useRecoilState } from "recoil";
import CustomerForm from "../../Pages/AddUser/CustomerForm";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const today = new Date().toISOString().split("T")[0];
const formatDateForInput = (dateString) => {
  if (!dateString) {
    return "";
  }
  const d = new Date(dateString);
  return d.toISOString().split("T")[0];
};
const UpdateView = () => {
  const [tabledata, setTableState] = useRecoilState(tableDataState);
  const { id } = useParams();
  const path = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();

  const localData = tabledata.find((item) => {
    if (item._id === id) {
      return item;
    }
  });

  const {
    data: customerData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["customerData", id],
    queryFn: async () => {
      const response = await Axios({
        requestType: "get",
        url: `/get-single-customer/${id}`,
      });
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error("Failed to fetch customer data");
      }
    },
    enabled: !localData,
    staleTime:600000
  });

  const formData = localData || customerData;

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
  });
  console.log(new Date(formData?.dob));
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        requestType: "put",
        url: "/update-customer-info",
        data: { id, newData: data },
      });
      if (response.status === 200) {
        setTableState((prev) =>
          prev.map((item) =>
            item._id === id ? { ...response.data.data } : item
          )
        );
        notify({
          message:"Customer Information Update Successully",
          position:'top-right',
          autocloseTime:3000,
          type:"success",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        navigate("/home/CustomerList");
      }
    } catch (error) {
      notify({
        message:`Error While Upating info ${error.message}`,
        position:'top-right',
        autocloseTime:3000,
        type:"error",
        theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
      })
      console.error("Error updating customer:", error);
    }
  };

  const isViewModelOnly = path.includes("View");
  useEffect(() => {
    if (customerData) {
      reset({
        basic: {
          Name: customerData.fullName || "",
          email: customerData.email || "",
          gender: customerData.gender || "",
          dob: formatDateForInput(formData?.dob) || "",
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
  }, [customerData, reset]);

  return (
    <AnimatePage>
      <ToastContainer/>
      {path && (
        <h1 className="text-center font-bold text-2xl py-1">
          {isViewModelOnly
            ? "View Customer Data"
            : "Update Customer Information"}
        </h1>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading customer data: {error.message}</p>}
      {!isLoading && !error && formData && (
        <CustomerForm
          today={today}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          path={path}
          register={register}
          errors={errors}
          isViewModelOnly={isViewModelOnly}
        />
      )}
    </AnimatePage>
  );
};

export default UpdateView;
