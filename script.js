const duckSays = document.getElementById("duck-says");
const userInput = document.getElementById("user-input");
const askButton = document.getElementById("ask-button");

let questionCount = 0; // 问题计数器

const OPENAI_API_KEY = "sk-...LEQA"; // 替换为你的 API 密钥
const API_URL = "https://api.openai.com/v1/chat/completions";

// 调用 OpenAI API 的函数
async function getDuckResponse(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Quack! Something went wrong with my brain.";
  }
}

// 按钮点击事件
askButton.addEventListener("click", async () => {
  const userQuestion = userInput.value.trim();

  if (!userQuestion) {
    duckSays.textContent = "Quack! You need to type something!";
    return;
  }

  questionCount++;

  if (questionCount < 5) {
    const response = await getDuckResponse(userQuestion); // 调用 OpenAI API
    duckSays.textContent = response || "Quack! I don’t know what to say.";
  } else if (questionCount === 5) {
    duckSays.textContent = "Alright, I can’t hide it anymore. Someone asked me to tell you... they like you. A lot. (Hint: It's [Your Name].)";
  } else {
    duckSays.textContent = "That’s all I’ve got for now. Quack!";
  }

  userInput.value = ""; // 清空输入框
});
