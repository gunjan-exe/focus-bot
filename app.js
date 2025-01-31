const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Configure CORS
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['POST', 'GET', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Accept', 'Origin'], // Allowed headers
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the chatbot server!' });
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Predefined set of questions and answers
const faq = {
    "what is your name?": "I am a simple chatbot created by you, gunjan!",
    "how are you?": "I am doing great, thank you for asking!",
    "what is the capital of france?": "The capital of France is Paris.",
    "tell me a joke": "Why don't skeletons fight each other? They don't have the guts!",
    "what is the weather today?": "Sorry, I can't check the weather for you. Please check a weather app!",
    "who are you?": "I am your friendly chatbot, here to answer your questions!",
    
    "how can i manage my time better?": "Try prioritizing tasks using the Eisenhower Matrix, setting clear deadlines, and using a planner or digital tools to track progress.",
    "what is the pomodoro technique?": "The Pomodoro Technique is a time management method where you work for 25 minutes, then take a 5-minute break. After four cycles, take a longer break.",
    "how do i avoid procrastination?": "Break tasks into smaller steps, set deadlines, and remove distractions. Using accountability partners can also help you stay on track.",
    "what are some good time management apps?": "Some popular time management apps include Todoist, Trello, Notion, and Google Calendar.",
    "how can i make a daily schedule?": "List your priorities, allocate time for each task, include breaks, and use tools like calendars or to-do lists to stay organized.",
    "why is time management important?": "Good time management helps improve productivity, reduces stress, and allows for a better work-life balance.",
    "how can i stop wasting time?": "Identify time-wasters, set specific goals, and use techniques like time blocking or the two-minute rule to stay focused.",
    "what is the two-minute rule?": "If a task takes less than two minutes, do it immediately instead of postponing it.",
    "how do i balance work and personal life?": "Set boundaries, plan your day efficiently, and make time for relaxation and hobbies.",

    "what is an api?": "An API (Application Programming Interface) allows different software applications to communicate with each other by defining a set of rules and protocols.",
    "what is rest api?": "A REST API (Representational State Transfer API) follows REST principles, using HTTP methods like GET, POST, PUT, and DELETE for communication.",
    "what is the difference between frontend and backend?": "Frontend refers to the user interface (UI) of an application, while backend handles the server-side logic, database, and application processing.",
    "what is the difference between http and https?": "HTTP (HyperText Transfer Protocol) is unsecured, whereas HTTPS (HyperText Transfer Protocol Secure) encrypts data using SSL/TLS for secure communication.",
    "what is the difference between sql and nosql?": "SQL databases are structured and use tables, while NoSQL databases are flexible, using formats like key-value, document, or graph-based storage.",
    "what is docker?": "Docker is a platform that allows developers to build, package, and deploy applications in lightweight, portable containers.",
    "what is a microservice?": "A microservice is a small, independent service that performs a specific function within a larger application, allowing for better scalability and maintenance.",
    "what is version control?": "Version control systems, like Git, track changes in code, allowing developers to collaborate and revert to previous versions when needed.",
    "what is the difference between git and github?": "Git is a version control system that tracks code changes, while GitHub is a cloud-based platform that hosts Git repositories for collaboration.",
    "what is machine learning?": "Machine learning is a branch of AI that enables computers to learn from data and make predictions without explicit programming.",
    "what is the difference between supervised and unsupervised learning?": "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data.",
    "how does a compiler work?": "A compiler translates source code into machine code, optimizing and generating an executable program in multiple stages like lexical analysis, parsing, and code generation.",
    "what is the difference between interpreted and compiled languages?": "Interpreted languages execute code line by line (e.g., Python), while compiled languages translate code into machine code before execution (e.g., C, C++).",
    "what is an operating system?": "An operating system (OS) manages hardware and software resources, providing essential services for applications to run.",
    "what is cloud computing?": "Cloud computing delivers computing services like storage, servers, databases, and networking over the internet, offering scalability and cost efficiency."
};

// Route for chatbot communication
app.post('/chat', (req, res) => {
    try {
        console.log('Received message:', req.body); // Debug log
        
        if (!req.body || !req.body.message) {
            throw new Error('No message provided');
        }

        const { message } = req.body;
        
        // Check if the message exists in the predefined set of answers
        const reply = faq[message.toLowerCase()] || "I'm not sure how to respond to that. Feel free to ask me something else!";
        
        console.log('Sending reply:', reply); // Debug log
        res.json({ reply });
    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Test the server by visiting http://localhost:${port}/test`);
});
