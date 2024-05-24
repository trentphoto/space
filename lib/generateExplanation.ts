"use server"

const generateExplanation = async (rowDetails) => {
    try {
      const prompt = `The following is information from a SpaceX launch. Please take a look at the [details] property and elaborate on it. Start directly with your elaboration: ${JSON.stringify(rowDetails)}`;
      const messages = [
        { role: 'system', content: 'You are a SpaceX rocket engineer who is highly knowledgeable about all things regarding rockets and space travel.' },
        { role: 'user', content: prompt },
      ];

      const reqBody = {
        model: 'gpt-3.5-turbo', 
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      }

      const reqHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }

      const response = await fetch(process.env.OPENAI_API_URL,
        {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(reqBody)
        }
      );
  
      const data = await response.json();
      return data.choices[0].message.content; 
    } catch (error) {
      console.error('Error generating explanation:', error);
      // Handle errors gracefully (e.g., show error message)
    }
  };

export default generateExplanation;
