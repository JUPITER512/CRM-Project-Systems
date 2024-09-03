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
    // (1-1)*10==-0 items will be skip for page 1
    // (1-1)*10==10 items will be skip for page 2
    // (2-1)*10==20 items will be skip for page 3
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

export const Remove_customer = async (req, res) => {
  try {

    if (!req.user._id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const find_customer = await Customer.findOne({ addedBy: req.user._id });

    if (!find_customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await Customer.deleteOne({ _id: find_customer._id });
    res.status(200).json({ message: `Customer with Email ${find_customer.email} deleted` });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
}
export const Update_customer_info = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { id, newData } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    if (!newData) {
      return res.status(400).json({ message: "New data is required" });
    }

    let finded_customer = await Customer.findByIdAndUpdate(id,newData,{new:true,runValidators});
    if (!finded_customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
