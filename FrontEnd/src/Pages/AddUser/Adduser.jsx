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

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    try {
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


  return (
    <>
      <AnimatePage>
        <CustomerForm
          today={today}
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
