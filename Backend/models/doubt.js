import mongoose from 'mongoose';

const DoubtSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    tags: { type: [String], default: [] },
    authorEmail: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in_discussion', 'resolved'], default: 'pending' },
    upvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    replyList: {
      type: [
        new mongoose.Schema(
          {
            authorEmail: String,
            content: String,
            createdAt: { type: Date, default: Date.now }
          },
          { _id: false }
        )
      ],
      default: []
    }
  },
  { timestamps: true }
);

const Doubt = mongoose.models.Doubt || mongoose.model('Doubt', DoubtSchema);
export default Doubt;
