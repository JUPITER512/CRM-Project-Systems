import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    address1: { type: String, trim: true, lowercase: true },
    address2: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true, lowercase: true },
    state: { type: String, trim: true, lowercase: true },
    zipCode: { type: Number },
    country:{type:String}
});
const customerSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true
      },
      id:{
        type:Number
      },
    fullName: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [8, 'Name must be at least 8 characters long'],
        maxlength: [40, 'Name must be at most 40 characters long'],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        trim: true,
    },
    dob: {
        type: Date,
        validate: {
            validator: function(v) {
                return v < new Date();
            },
            message: 'Date of birth must be in the past.'
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    },
    primaryPhone: { type: String },
    alternativePhone: { type: String },
    address: AddressSchema,
    customerCommunicationPreference: { type: String },
    customerStatus: {
        type: String,
        required: true
    },
    customerCompanyName: {
        type: String,
    },
    customerJobTitle: {
        type: String,
    },
    additionalInfoNote: { type: String, trim: true },
    additionalInfoSourceOfLead: { type: String },
   

}, { timestamps: true });
customerSchema.index({ addedBy: 1, email: 1 }, { unique: true });


customerSchema.methods.totalCount = async function() {
    return await this.countDocuments();
};
customerSchema.methods.countByStatus = async function () {
    return this.customerStatus
};

export  const Customer=mongoose.model("Customer",customerSchema);