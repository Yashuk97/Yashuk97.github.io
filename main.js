var typed = new Typed(".text", {
    strings: ["AI and Machine Learning", "Web Development", "Technology", "Learning"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const aboutSection = document.getElementById('about');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
        }
        else {
            entry.target.classList.remove('shadow-animate');
        }
    });
}, {
    threshold: 0.5 
});
observer.observe(aboutSection);

// --- Projects Section JavaScript ---
const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');
const hideProjectsBtn = document.getElementById('hideProjectsBtn');
const allProjectsContainer = document.getElementById('allProjectsContainer');
const initialProjectsContainer = document.querySelector('.projects-container.initial-display');

// Function to show all projects
viewAllProjectsBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior (jumping to top)
    allProjectsContainer.classList.add('show'); // Show the hidden container
    initialProjectsContainer.style.display = 'none'; // Hide the initial curated view
    viewAllProjectsBtn.style.display = 'none'; // Hide "View All" button
    hideProjectsBtn.parentElement.style.display = 'block'; // Show "Hide Projects" button parent
});

// Function to hide projects and revert to initial view
hideProjectsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    allProjectsContainer.classList.remove('show'); // Hide the hidden container
    initialProjectsContainer.style.display = 'grid'; // Show initial curated view (as grid)
    viewAllProjectsBtn.style.display = 'block'; // Show "View All" button
    hideProjectsBtn.parentElement.style.display = 'none'; // Hide "Hide Projects" button parent
    // Optional: Scroll back up to the top of the projects section
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

// Initially hide the 'Hide Projects' button's parent (the div containing it)
hideProjectsBtn.parentElement.style.display = 'none';

// --- Chatbot JavaScript ---
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const closeChatbotBtn = document.getElementById('close-chatbot');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Toggle chatbot visibility
chatbotIcon.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    // If opening, focus on input
    if (chatbotContainer.classList.contains('active')) {
        userInput.focus();
    }
});

closeChatbotBtn.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Function to add a message to the chatbot display
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
}

// Handle user input
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === '') return;

    addMessage(userText, 'user');
    userInput.value = ''; // Clear input

    // Get bot response
    setTimeout(() => {
        const botResponse = getBotResponse(userText);
        addMessage(botResponse, 'bot');
    }, 800); // Simulate typing delay
}

// Simple bot response logic
function getBotResponse(userText) {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('hello') || lowerText.includes('hi')) {
        return "Hi there! How can I assist you with Yasaswini's portfolio?";
    } else if (lowerText.includes('yasaswini')) {
        return "Yasaswini is a third-year Computer Science student passionate about AI, Machine Learning, and Web Development.";
    } else if (lowerText.includes('skills')) {
        return "Yasaswini has skills in Python, Java, JavaScript, HTML, CSS, React.js, Node.js, SQL, Docker, and various ML frameworks like TensorFlow and PyTorch.";
    } else if (lowerText.includes('projects')) {
        return "Yasaswini has worked on projects like TETRECS (AI Tetris), a CQL Interpreter, a Runway Redeclaration Tool, and a website for Maansa Constructions. You can find more details in the 'Projects' section.";
    } else if (lowerText.includes('education') || lowerText.includes('study')) {
        return "Yasaswini is currently pursuing B.Sc. in Computer Science at the University of Southampton.";
    } else if (lowerText.includes('contact')) {
        return "You can find Yasaswini's contact details (email, phone, social media) in the 'Contact' section at the bottom of the page!";
    } else if (lowerText.includes('thank you') || lowerText.includes('thanks')) {
        return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerText.includes('bye') || lowerText.includes('goodbye')) {
        return "Goodbye! Have a great day!";
    } else {
        return "I'm not sure I understand that. I can tell you about Yasaswini's skills, projects, education, or how to contact her.";
    }
}
// --- End Chatbot JavaScript ---