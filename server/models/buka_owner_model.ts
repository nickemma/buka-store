import mongoose, { InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';

const OpeningHoursSchema = new mongoose.Schema({
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

const BukaSchema = new mongoose.Schema({
  buka_name: {
    type: String,
    required: [true, 'Please enter the name of the buka'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an Email'],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  image: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvC1pGhW7_BRwnGuBguLE99tfA0faYflekCA&s',
  },
  phone: {
    type: String,
    default: '+44',
  },
  address: {
    type: String,
    default: 'No address provided',
  },
  postcode: {
    type: String,
    default: 'No postcode provided',
  },
  pre_order: {
    type: Boolean,
    default: false,
  },
  go_live: {
    type: Boolean,
    default: false,
  },
  opening_hours: {
    monday: {
      type: [OpeningHoursSchema],
      default: [],
    },
    tuesday: {
      type: [OpeningHoursSchema],
      default: [],
    },
    wednesday: {
      type: [OpeningHoursSchema],
      default: [],
    },
    thursday: {
      type: [OpeningHoursSchema],
      default: [],
    },
    friday: {
      type: [OpeningHoursSchema],
      default: [],
    },
    saturday: {
      type: [OpeningHoursSchema],
      default: [],
    },
    sunday: {
      type: [OpeningHoursSchema],
      default: [],
    },
  },
},{
    timestamps: true,
});


// Hash the password before saving to database using the pre() hook method
BukaSchema.pre('save', async function (next) {
  // function to hash the password before saving to database

  if (!this.isModified('password')) {
    return next(); // If the password is not modified, continue saving
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.get('password'), salt);
    this.set('password', hashedPassword);

    return next(); // Call the next() function to continue saving
  } catch (error) {
    console.log(error); // Pass any error to the next middleware
  }
});

export type BukaType = InferSchemaType<typeof BukaSchema>;

export default mongoose.model('Buka', BukaSchema);
