import User from './../models/user-model.js';

export const updateAdvice = async (req, res) => {
  const { userId } = req.params;
  const { adviceId, content, generatedAt } = req.body;

  const updatedAdvice = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        advice: { id: adviceId, content: content, generatedAt: generatedAt },
      },
    }
  );

  if (!updatedAdvice) {
    return res
      .status(400)
      .json({ error: 'Could not update advice', status: 400 });
  }

  res
    .status(200)
    .json({
      updatedAdvice: updatedAdvice,
      success: 'Advice updated successfully',
      status: 200,
    });
};
