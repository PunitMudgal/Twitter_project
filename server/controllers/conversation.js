import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const createConversation = async (req, res) => {
  try {
    const { participants } = req.body;

    if (!Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({ message: "Invalid participants list." });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: participants },
      $expr: { $eq: [{ $size: "$participants" }, participants.length] },
    });

    if (conversation) return res.status(200).json(conversation);

    conversation = new Conversation({ participants, lastMessage: null });
    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const { _id } = req.user;

    const conversations = await Conversation.find({ participants: _id })
      .populate({
        path: "participants",
        match: { _id: { $ne: _id } }, // exluding logedin user details
        select: "name username profilePicturePath _id isAdmin",
      })
      .populate({
        path: "lastMessage",
        select: "text createdAt",
      })
      .lean();
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLastMessage = async (req, res) => {
  try {
    const { conversationId, messageId } = req.body;

    const updateConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { lastMessage: messageId },
      { new: true }
    ).lean();

    if (!updateConversation)
      return res.status(404).json({ message: "Conversation not found" });

    res.status(200).json(updateConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const deleteConversation = await Conversation.findByIdAndDelete(
      conversationId
    );

    if (!deleteConversation) {
      return res.status(404).json({ message: "Conversation not found!" });
    }

    await Message.deleteMany({ conversationId });

    res.status(200).json(deleteConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
