// Select Elements
var chatBubble = document.querySelector("#chat-bubble");
var chatWrapper = document.querySelector("#chat-wrapper");
var btn = document.querySelector("#btn");
var content = document.querySelector("#chat-container");
var messageInput = document.querySelector("#message-input");
var suggestionsContainer = document.querySelector("#suggestions");
// Toggle Chat Window (Show/Hide Chat)
chatBubble.addEventListener("click", function () {
    chatWrapper.style.display = chatWrapper.style.display === "none" ? "flex" : "none";
});
// Class Timings for Each Weekday
var classSchedule = {
    "monday": "Classes run from 9:00 AM to 5:00 PM.",
    "tuesday": "Classes run from 9:00 AM to 5:00 PM.",
    "wednesday": "Classes run from 9:00 AM to 5:00 PM.",
    "thursday": "Classes run from 9:00 AM to 5:00 PM.",
    "friday": "Classes run from 9:00 AM to 5:00 PM.",
    "saturday": "Weekend classes from 10:00 AM to 2:00 PM.",
    "sunday": "No classes! Enjoy your day off."
};
// Contact Information
var contactInfo = "📧 Email: aimsclasses07@gmail.com\n📞 Phone: 8777811841";
// Predefined responses
var responses = {
    "hello": "Hello student, what can I help you with?",
    "who are you": "I am AskAIMS, your virtual assistant for AIMS (AMIT INSTITUTE OF MATH'S AND SCIENCE), created using modern web technologies.",
    "subjects": "Please tell me your interests or career goals, and I can suggest suitable subjects or courses.",
    "courses": "Please tell me your interests or career goals, and I can suggest suitable subjects or courses.",
    "college": "Are you looking for specific colleges or general advice on how to choose one?",
    "university": "Are you looking for specific colleges or general advice on how to choose one?",
    "class timings": function () { return showTodaySchedule(); },
    "contact": function () { return displayMessage(contactInfo); },
    "contact us": function () { return displayMessage(contactInfo); },
    "today's schedule": function () { return showTodaySchedule(); },
    "open youtube": function () {
        displayMessage("Opening YouTube...");
        window.open("https://youtube.com/@gyanofficialchannel3418", "_blank");
    },
    "open google": function () {
        displayMessage("Opening Google...");
        window.open("https://google.com/", "_blank");
    },
    "time": function () {
        displayMessage("The current time is ".concat(new Date().toLocaleTimeString()));
    },
    "date": function () {
        displayMessage("Today's date is ".concat(new Date().toLocaleDateString()));
    }
};
// Function to show today's class schedule
function showTodaySchedule() {
    var today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    var schedule = classSchedule[today] || "No class schedule available.";
    displayMessage("\uD83D\uDCC5 Today is ".concat(today.charAt(0).toUpperCase() + today.slice(1), ".\n").concat(schedule));
}
// Display message in chat
function displayMessage(text, isUser) {
    if (isUser === void 0) { isUser = false; }
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "user-message" : "assistant-message");
    messageDiv.innerText = text;
    content.appendChild(messageDiv);
    content.scrollTop = content.scrollHeight;
}
// Handle user input
function handleUserInput() {
    var userMessage = messageInput.value.trim();
    if (!userMessage)
        return;
    displayMessage(userMessage, true);
    setTimeout(function () {
        if (responses[userMessage.toLowerCase()]) {
            typeof responses[userMessage.toLowerCase()] === "function"
                ? responses[userMessage.toLowerCase()]()
                : displayMessage(responses[userMessage.toLowerCase()]);
        }
        else {
            displayMessage("I'm not sure how to respond to that. Try asking about subjects, courses, or contacting us!");
        }
    }, 1000);
    setTimeout(function () { messageInput.value = ""; }, 100);
}
// Event Listeners
btn.addEventListener("click", handleUserInput);
messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleUserInput();
    }
});
// Generate predefined suggestion buttons
function generateSuggestions() {
    var suggestions = ["hello", "who are you", "class timings", "contact us", "time", "date"];
    suggestions.forEach(function (text) {
        var button = document.createElement("button");
        button.classList.add("suggestion-btn");
        button.innerText = text;
        button.addEventListener("click", function () {
            messageInput.value = text;
            handleUserInput();
        });
        suggestionsContainer.appendChild(button);
    });
}
generateSuggestions();
