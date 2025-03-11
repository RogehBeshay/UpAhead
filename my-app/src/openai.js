import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true
});

export const generateTaskInsight = async (taskName) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user", 
          content: `Generate an encouraging or interesting insight about the task: ${taskName}`
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Keep pushing forward!";
  }
};