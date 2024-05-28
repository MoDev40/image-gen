import { Document, Schema, model, models } from "mongoose";

interface TransactionDocument extends Document {
    stripeId:string;
    amount:number;
    plan:string;
    credits:number;
    buyer:Schema.Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}

const TransactionSchema = new Schema({
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  credits: {
    type: Number,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamps: true});

const Transaction = models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;