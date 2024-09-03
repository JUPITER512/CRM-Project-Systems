import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    addLine1: { type: String, trim: true, lowercase: true },
    addLine2: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true, lowercase: true },
    state: { type: String, trim: true, lowercase: true },
    zipCode: { type: Number }
});

const customerSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true
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
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    primaryPhone: { type: String },
    alternativePhone: { type: String },
    address: AddressSchema,
    customerCommunicationPreference: { type: String },
    customerStatus: {
        type: Boolean,
        required: true
    },
    customerCompanyName: {
        type: String,
        required: true
    },
    customerJobTitle: {
        type: String,
        required: true
    },
    additionalInfoNote: { type: String, trim: true },
    additionalInfoSourceOfLead: { type: String }
}, { timestamps: true });

export  const Customer=mongoose.model("Customer",customerSchema)