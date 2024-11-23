import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const { _id: userId } = req.user;

    const message = new Message({ conversationId, sender: userId, text });
    const [savedMessage] = await Promise.all([
      message.save(),
      Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: message._id,
      }),
    ]);
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const messages = await Message.find({ conversationId })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const markMessageRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );

    if (!updatedMessage)
      return res.status(404).json({ message: "message not found!" });

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) return res.status(404).json("Message not found!");

    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
