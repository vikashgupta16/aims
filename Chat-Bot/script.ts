// Select Elements
const chatBubble = document.querySelector<HTMLDivElement>("#chat-bubble")!;
const chatWrapper = document.querySelector<HTMLDivElement>("#chat-wrapper")!;
const btn = document.querySelector<HTMLButtonElement>("#btn")!;
const content = document.querySelector<HTMLDivElement>("#chat-container")!;
const messageInput = document.querySelector<HTMLInputElement>("#message-input")!;
const suggestionsContainer = document.querySelector<HTMLDivElement>("#suggestions")!;

// Toggle Chat Window (Show/Hide Chat)
chatBubble.addEventListener("click", () => {
    chatWrapper.style.display = chatWrapper.style.display === "none" ? "flex" : "none";
});

// Class Timings for Each Weekday
const classSchedule: { [key: string]: string } = {
    "monday": "Classes run from 9:00 AM to 5:00 PM.",
    "tuesday": "Classes run from 9:00 AM to 5:00 PM.",
    "wednesday": "Classes run from 9:00 AM to 5:00 PM.",
    "thursday": "Classes run from 9:00 AM to 5:00 PM.",
    "friday": "Classes run from 9:00 AM to 5:00 PM.",
    "saturday": "Weekend classes from 10:00 AM to 2:00 PM.",
    "sunday": "No classes! Enjoy your day off."
};

// Contact Information
const contactInfo = "📧 Email: aimsclasses07@gmail.com\n📞 Phone: 8777811841";

// Predefined responses
const responses: { [key: string]: string | (() => void) } = {
    "hello": "Hello student, what can I help you with?",
    "who are you": "I am AskAIMS, your virtual assistant for AIMS (AMIT INSTITUTE OF MATH'S AND SCIENCE), created using modern web technologies.",
    "subjects": "Please tell me your interests or career goals, and I can suggest suitable subjects or courses.",
    "courses": "Please tell me your interests or career goals, and I can suggest suitable subjects or courses.",
    "college": "Are you looking for specific colleges or general advice on how to choose one?",
    "university": "Are you looking for specific colleges or general advice on how to choose one?",
    "class timings": () => showTodaySchedule(),
    "contact": () => displayMessage(contactInfo),
    "contact us": () => displayMessage(contactInfo),
    "today's schedule": () => showTodaySchedule(),
    "open youtube": () => {
        displayMessage("Opening YouTube...");
        window.open("https://youtube.com/@gyanofficialchannel3418", "_blank");
    },
    "open google": () => {
        displayMessage("Opening Google...");
        window.open("https://google.com/", "_blank");
    },
    "time": () => {
        displayMessage(`The current time is ${new Date().toLocaleTimeString()}`);
    },
    "date": () => {
        displayMessage(`Today's date is ${new Date().toLocaleDateString()}`);
    }
};

// Function to show today's class schedule
function showTodaySchedule(): void {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const schedule = classSchedule[today] || "No class schedule available.";
    displayMessage(`📅 Today is ${today.charAt(0).toUpperCase() + today.slice(1)}.\n${schedule}`);
}

// Display message in chat
function displayMessage(text: string, isUser: boolean = false): void {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "user-message" : "assistant-message");
    messageDiv.innerText = text;
    content.appendChild(messageDiv);
    content.scrollTop = content.scrollHeight;
}

// Handle user input
function handleUserInput(): void {
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, true);

    setTimeout(() => {
        if (responses[userMessage.toLowerCase()]) {
            typeof responses[userMessage.toLowerCase()] === "function"
                ? (responses[userMessage.toLowerCase()] as () => void)()
                : displayMessage(responses[userMessage.toLowerCase()] as string);
        } else {
            displayMessage("I'm not sure how to respond to that. Try asking about subjects, courses, or contacting us!");
        }
    }, 1000);

    setTimeout(() => { messageInput.value = ""; }, 100);
}

// Event Listeners
btn.addEventListener("click", handleUserInput);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleUserInput();
    }
});

// Generate predefined suggestion buttons
function generateSuggestions(): void {
    const suggestions = ["hello", "who are you", "class timings", "contact us", "time", "date"];
    suggestions.forEach(text => {
        const button = document.createElement("button");
        button.classList.add("suggestion-btn");
        button.innerText = text;
        button.addEventListener("click", () => {
            messageInput.value = text;
            handleUserInput();
        });
        suggestionsContainer.appendChild(button);
    });
}

generateSuggestions();
