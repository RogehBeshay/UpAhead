import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export const generateTaskInsight = async (taskName) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "Generate a motivational or fun fact about a task"
        },
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