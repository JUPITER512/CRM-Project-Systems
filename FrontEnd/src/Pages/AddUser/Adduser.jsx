import { useEffect } from "react";
import AnimatePage from "@components/AnimatePage";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import Axios from "@hooks/Axios";
import { useRecoilStateLoadable } from "recoil";
import { TableData } from "../../Store/TableData";
import CustomerForm from "./CustomerForm";
import { useQuery } from "@tanstack/react-query";

const today = new Date().toISOString().split("T")[0];

const Adduser = () => {
  const { id } = useParams();
  const path = useLocation().pathname;
  const read_updateMode = ["View-Customer-Info", "Update-Customer-Info"].includes(path.split("/")[3]);
  const [dataState,setDataState] = useRecoilStateLoadable(TableData);
  const userData = read_updateMode ? dataState.contents.find(item => item._id === id) : null;
  const { data: fetchedUserData, isLoading, error } = useQuery({
    queryKey: ["customer-data", id],
    queryFn: async () => {
      const res = await Axios({
        url: `/get-single-customer/${id}`,
        requestType: "get",
      });
      if (res.status === 200) {
        return res.data.data;
      }
      throw new Error("Failed to fetch user data");
    },
    enabled: read_updateMode && !userData,
    staleTime: 30000,
    refetchOnMount:false
  });

  const currentUserData = userData || fetchedUserData;
  const form = useForm({
    defaultValues: {
      basic: {
        Name: currentUserData?.fullName || "",
        email: currentUserData?.email || "",
        gender: currentUserData?.gender || "",
        dob: currentUserData?.dob
          ? new Date(currentUserData.dob).toISOString().split("T")[0]
          : "",
        primaryPhone: currentUserData?.primaryPhone || "",
        alternativePhone: currentUserData?.alternativePhone || "",
      },
      address: {
        address1: currentUserData?.address?.address1 || "",
        address2: currentUserData?.address?.address2 || "",
        city: currentUserData?.address?.city || "",
        state: currentUserData?.address?.state || "",
        country: currentUserData?.address?.country || "",
        zipCode: currentUserData?.address?.zipCode || "",
      },
      communicationStatus: {
        CommunicationPreferences:
          currentUserData?.customerCommunicationPreference || "",
        status: currentUserData?.customerStatus || "",
      },
      company: {
        name: currentUserData?.customerCompanyName || "",
        JobTitle: currentUserData?.customerJobTitle || "",
      },
      Additional: {
        Notes: currentUserData?.additionalInfoNote || "",
        SourceofLead: currentUserData?.additionalInfoSourceOfLead || "",
      },
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (currentUserData) {
      form.reset({
        basic: {
          Name: currentUserData.fullName || "",
          email: currentUserData.email || "",
          gender: currentUserData.gender || "",
          dob: currentUserData.dob
            ? new Date(currentUserData.dob).toISOString().split("T")[0]
            : "",
          primaryPhone: currentUserData.primaryPhone || "",
          alternativePhone: currentUserData.alternativePhone || "",
        },
        address: {
          address1: currentUserData.address?.address1 || "",
          address2: currentUserData.address?.address2 || "",
          city: currentUserData.address?.city || "",
          state: currentUserData.address?.state || "",
          country: currentUserData.address?.country || "",
          zipCode: currentUserData.address?.zipCode || "",
        },
        communicationStatus: {
          CommunicationPreferences:
            currentUserData.customerCommunicationPreference || "",
          status: currentUserData.customerStatus || "",
        },
        company: {
          name: currentUserData.customerCompanyName || "",
          JobTitle: currentUserData.customerJobTitle || "",
        },
        Additional: {
          Notes: currentUserData.additionalInfoNote || "",
          SourceofLead: currentUserData.additionalInfoSourceOfLead || "",
        },
      });
    }
  }, [currentUserData, form]);

  const onSubmit = async (data) => {
    try {
      setDataState((prev)=>{
        return [data,...prev]
      })
      const response = await Axios({
        requestType: "post",
        url: "/add-customer",
        data: data,
      });
      if (response.status === 200) {
        console.log("User added to your profile");
        reset();
      } else {
        console.error("Failed to add user:", response.status);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const isViewModelOnly = ["View-Customer-Info"].includes(path.split("/")[3]);

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  return (
    <>
      <AnimatePage>
        <CustomerForm
          today={today}
          isViewModelOnly={isViewModelOnly}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          path={path}
          register={register}
          errors={errors}
        />
      </AnimatePage>
    </>
  );
};

export default Adduser;
