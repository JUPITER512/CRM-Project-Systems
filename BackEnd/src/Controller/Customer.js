import { Customer } from "../Models/CustomerBasicInfo.model.js";

export const Add_Customer = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dob,
      email,
      primaryPhone,
      alternativePhone,
      address,
      customerCommunicationPreference,
      customerStatus,
      customerCompanyName,
      customerJobTitle,
      additionalInfoNote,
      additionalInfoSourceOfLead,
    } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const manager_id = req.user._id;
    const newCustomerAddition = await Customer.create({
      addedBy: manager_id,
      fullName,
      gender,
      dob,
      email,
      primaryPhone,
      alternativePhone,
      address,
      customerCommunicationPreference,
      customerStatus,
      customerCompanyName,
      customerJobTitle,
      additionalInfoNote,
      additionalInfoSourceOfLead,
    });

    res.status(200).json({
      message: "Customer added successfully",
      customer: newCustomerAddition,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Get_Customer = async (req, res) => {
  try {
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const customers = await Customer.find({
      addedBy:req.user._id
    })
    .skip(skip)
    .limit(limit);

    const totalCustomers = await Customer.countDocuments({addedBy:req.user._id});

    
    res.status(200).json({
      page,
      limit,
      totalCustomers,
      totalPages: Math.ceil(totalCustomers / limit),
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      messag: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Remove_customer=async(req,res)=>{
  
}

// 66d6f8cc0faba3c8f163f5df
// 66d6e0ec27202e60bf333031
