import { Customer } from "../Models/CustomerBasicInfo.model.js";
import { User } from "../Models/User.model.js";

  export const Add_Customer = async (req, res) => {
    try {
      const {
        Additional,
        address,
        basic,
        communicationStatus,
        company
      } = req.body;

      if (!req.user || !req.user._id) {
        return res.status(400).json({ message: "User not authenticated" });
      }
      const manager_id = req.user._id;
      const existingCustomer = await Customer.findOne({ addedBy: manager_id, email: basic?.email });
      if (existingCustomer) {
        return res.status(400).json({
          message: "Customer with this email already exists",
        });
      }
  
      const newCustomerAddition = await Customer.create({
        addedBy:manager_id || null,
        fullName:basic?.Name || null,
        email:basic?.email || null,
        gender:basic?.gender || null,
        primaryPhone:basic?.primaryPhone || null,
        alternativePhone:basic?.alternativePhone || null,
        dob: basic?.dob ? new Date(basic?.dob) : null,
        address:address || null,
        customerCommunicationPreference:communicationStatus?.CommunicationPreferences || null,
        customerStatus:communicationStatus?.status || null,
        customerCompanyName:company?.JobTitle || null, 
        customerJobTitle:company?.name || null,
        additionalInfoNote:Additional?.Notes || null,
        additionalInfoSourceOfLead:Additional?.SourceofLead || null

      })
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

    //for page 1 we need to skip 0 
    // (page - 1) * limit 
    // page 1 
    //(1-1)*10
    //(0)*0 == 0 
    // so we need to skip zero element

    // for page 4 and limit 40
    // (4-1)*40
    // (3)*40
    // 120 == skipped means from start 0 index till 139 
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
      totalPages: Math.ceil(totalCustomers / limit),// math ceil i.e 0.5 to 1 or 1.2 to 2
      // here math.ceil(30/20) math.ceil(1.5) ==> returns 2 means we have limit of 20 document on one page and other 10 will be on second page
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      messag: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Get_Single_Customer=async(req,res)=>{
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).json({
        message:"Id Is not given"
      })
    }
    const customerInDb=await Customer.findById(id);
    if(!customerInDb){
      return res.status(400).json({
        message:"Invalid Id/No Customer Found"
      })
    }
    res.status(200).json({
      message:"Customer Found",
      data:customerInDb
    })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}
export const Remove_customer = async (req, res) => {
  try {

    if (!req.user._id) {
      return res.status(400).json(
        { message: "User ID is required" }
        );
    }
    const find_customer = await Customer.findOne(
      { addedBy: req.user._id }
      );

    if (!find_customer) {
      return res.status(404).json(
        { message: "Customer not found" }
        );
    }
    await Customer.deleteOne({ _id: find_customer._id });
    await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { removedCustomers: 1 } },
    );
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

    const {
      Additional,
      address,
      basic,
      communicationStatus,
      company
    } = newData;

    const updatedData = {
      fullName: basic?.Name || null,
      email: basic?.email || null,
      gender: basic?.gender || null,
      primaryPhone: basic?.primaryPhone || null,
      alternativePhone: basic?.alternativePhone || null,
      dob: basic?.dob ? new Date(basic?.dob) : null,
      address: address || null,
      customerCommunicationPreference: communicationStatus?.CommunicationPreferences || null,
      customerStatus: communicationStatus?.status || null,
      customerCompanyName: company?.JobTitle || null,
      customerJobTitle: company?.name || null,
      additionalInfoNote: Additional?.Notes || null,
      additionalInfoSourceOfLead: Additional?.SourceofLead || null
    };

    // Update the customer in the database
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      data: updatedCustomer
    });

  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};