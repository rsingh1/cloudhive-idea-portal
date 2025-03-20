CloudHive Feature Idea Portal
The CloudHive Feature Idea Portal is an internal web application that allows employees to submit, explore, and vote on feature ideas for the Integration Hub product. This tool fosters innovation and collaboration within the company by enabling employees to shape the product roadmap.

Table of Contents
1.	Features
2.	Technologies Used
3.	Getting Started
a.	Prerequisites
b.	Installation
c.	Running the Project
4.	Design Constraints and Assumptions
5.	Future Enhancements
6.	Contributing
7.	License

1.	Features
•	Idea Submission: Employees can submit new feature ideas with a summary, description, priority, and assigned employee.
•	Idea List and Voting: Display a list of ideas sorted by upvotes. Employees can upvote, downvote, or delete ideas.
•	Idea Exploration: Click on an idea (heading or description) to view its full details, including description and voting history.
•	Search Functionality: Search for ideas by keywords in the summary or description.
•	Pagination: Display 20 ideas per page to maintain performance and usability.
•	Edit Ideas: Employees can edit existing ideas to update their details.
2.	Technologies Used
Frontend:
•	Next.js 15
•	React 19
•	TailwindCSS (for styling)
•	RadixUI (for UI components)
•	react-hook-form (for form management)
•	TanStack Query (for client-side state management)
Backend:
•	Next.js API Routes (for server-side logic)
•	JSON file storage 
•	Package Manager: pnpm

3.	Getting Started
a)	Prerequisites
•	Node.js (v18 or higher)
•	pnpm (v8 or higher)
b)	Installation
Clone the repository:
git clone https://github.com/rsingh1/cloudhive-idea-portal.git
Navigate to the project directory:
cd cloudhive-idea-portal
Install dependencies:
pnpm install
c)	Running the Project
Start the development server:
pnpm dev
Open your browser and navigate to:
http://localhost:3000
4.	Design Constraints and Assumptions
File-Based Storage:
The project uses ideas.json and employees.json files for data storage. This is suitable for a proof of concept but not recommended for production.
File-based storage can lead to race conditions and performance issues with concurrent requests.
No Authentication:
This is an internal tool, so no authentication or authorization is implemented. In a production environment, user authentication should be added.
Pagination:
The idea list is paginated to display 20 ideas per page. This ensures good performance even with a large number of ideas.
UI/UX:
The UI is designed to be simple and intuitive, with a focus on usability and engagement.
TailwindCSS is used for styling, ensuring a clean and responsive design.
5.	Future Enhancements
Database Integration:
Replace file-based storage with a database (e.g., SQLite, PostgreSQL, or MongoDB) for better performance and scalability.
Authentication and Authorization:
Add user authentication (e.g., using NextAuth.js) to restrict access to authorized employees.
Implement role-based access control (e.g., admins can delete ideas, while regular users can only vote).
Advanced Sorting and Filtering:
Allow users to sort ideas by different criteria (e.g., upvotes, downvotes, date created).
Add advanced filtering options (e.g., filter by priority, employee, or date range).
Real-Time Updates:
Use WebSockets or server-sent events (SSE) to provide real-time updates when ideas are added, updated, or voted on.
Analytics Dashboard:
Add a dashboard to display analytics, such as the most popular ideas, top contributors, and voting trends.
Email Notifications:
Send email notifications to employees when their ideas are upvoted, downvoted, or commented on.
Idea Comments:
Allow employees to comment on ideas to facilitate discussion and collaboration.

6.	Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
Fork the repository.
Create a new branch for your feature or bugfix.
Commit your changes and push the branch.
Submit a pull request with a detailed description of your changes.
7.	License
This project is licensed under the MIT License. See the LICENSE file for details.
