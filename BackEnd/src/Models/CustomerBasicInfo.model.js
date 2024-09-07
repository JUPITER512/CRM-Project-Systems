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
        type: String,
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

const sequenceSchema = new mongoose.Schema({
    model: { type: String, required: true, unique: true },
    sequence_value: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);
customerSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const sequence = await Sequence.findOneAndUpdate(
                { model: 'Customer' },
                { $inc: { sequence_value: 1 } },
                { new: true, upsert: true }
            );
            this.id = sequence.sequence_value;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

customerSchema.post('deleteOne', async function (doc, next) {
  try {
    await Sequence.findOneAndUpdate(
      { model: 'Customer' },
      { $inc: { sequence_value: -1 } }
    );
    next();
  } catch (error) {
    next(error);
  }
});
export  const Customer=mongoose.model("Customer",customerSchema);