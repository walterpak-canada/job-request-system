# Job Request System

This is a TypeScript React application that was mainly created by Claude AI code generation (Free tier). Below are the steps:

1. Create a free account in [Anthropic](https://www.anthropic.com/) to use Claude.
2. In [Claude](https://claude.ai/), enter the [prompt](./claude-context.md) to prepare Claude as a front-end developer. You may refer to [Cursor Directory](https://cursor.directory/) for useful prompts.
3. Once Claude is ready, provide the [business requirement](./business-requirement.md) with a [sample image](./request_form_example.png) for styling.
4. Since Claude is prepared as an expert of ReactJS, TypeScript, and Tailwind CSS, around 350+ lines of React code are generated in a minute.
5. The result is copied into [App.tsx](./src/App.tsx).
6. A few issues are found and fixed before the application runs properly. Please refer to the next section [Lessons learned](#lessons-learned) for details.

# Lessons learned

It's my first time using Claude to generate application code, with a lot of expectations...

## General user experience

I used a free tier account in Claude, which can only be accessed from web browser. I have to copy code into Visual Studio Code in order to test. However, with paid access, the subscription plans provide integration with IDEs and generate codes both inline and into new files. It makes Claude to be an co-author of your code projects. You can refer to [Claude Code IDE Integrations](https://docs.anthropic.com/en/docs/claude-code/ide-integrations) for the latest information.

## Problem solving process

Before Claude implemented the application, it constructed a plan to show how it would fulfill the requirement, according to role what was assigned via the prompt at the beginning of the conversation. It clearly shows that it understands the importance of planning. It is capable to break down complex requirements into smaller tasks. Then, it follows the plan and completes the tasks accordingly.

**The implementation plan received from Claude**

1. Main Layout Structure:

- Split page into two sections: left (job list) and right (new request form)
- Use flexbox for responsive layout

2. State Management:

- jobRequests array to store submitted requests
- showForm boolean to toggle form visibility
- formData object for form inputs (job, date, location, details, timeSlot)

3. Available Jobs Array:

- Pre-defined job items with durations
- Dog Walk (30 min), Dog Wash (1 hr), Dog Daycare variants, HVAC repair, Grocery Shopping

4. Left Section - Job List:

- Display all submitted job requests
- Show job type, date, location, time slot
- Handle empty state when no jobs requested

5. Right Section - Request Form:

- "New Job Request" button to show form
- Form fields: job selection, date picker, location input, details textarea, time slots
- Form validation and submission
- Reset form after submission

6. Hidden Right Section by Default:

- Right section is now hidden on initial load
- Left section takes full width when right section is hidden

7. Toggle Button:

- Fixed position toggle button in top-right corner (floating)
- Animated arrow icon that rotates when toggled
- Smooth color transitions on hover
- Proper accessibility labels

8. Smooth Animations:

- Right section slides in/out with translate-x transform
- 500ms duration with easing for smooth motion
- Left section dynamically adjusts width with transitions
- Toggle button icon rotates 180° when panel is open

9. Enhanced UX:

- "New Job Request" button appears in the left section header when right panel is closed
- Right section is positioned as fixed overlay when open
- Proper z-index layering to ensure toggle button stays accessible
- Scroll support for right section content

10. Styling:

- Extract colors from mockup: dark teal buttons, green checkmarks, gray text
- Use Tailwind for responsive design and accessibility

## Accuracy

The result comes with a few issues. I didn't bother asking Claude to fix them because it is running in the web browser, i.e. it doesn't have access to my project files. After fixing the below issues, the application is up running successfully. The most important thing is: it fulfilled the business requirements!

**Issues found**

1. Most of the "import" statements are missing. Lucky, I know React and added those statements back quickly.
2. There are a few "confusing void expression problems" reported by ESLint's TypeScript type checking. They were simply fixed following VS Code's suggestions.
3. There are animation problems in the toggle buttons. Buttoms were overlapped with each other and animation was wrong. It took me some time to understand the flow design problem before I fixed it.
4. Footer is missing. I didn't clearly mentioned it in the requirement. That's my fault. I added it back as a custom element.
5. Refactoring will be needed. Maybe I didn't mention it in the requirement, but all 350+ lines were created in a big chunk React code. A senior developer should have broken it down into custom elements and files for better reusability and maintainability! Claude should have generated the result into multiple sections for me to copy them into files accordingly. But I know I cannot expect too much with free access!

## Performance

It's a task with simple business requirement of a single page web application. Over 350 lines of code were created in a minute. The result comes with necessary components of modern web application, including:

- React state management
- Tailwind CSS with animation and Lucide icons
- TypeScript data structures (interface) and functions, correctly representing domain objects and events

# Conclusion

The application was available for testing in an hour. I learned a lot with Claude code and it was fun! I spent some extra time to make it more user-friendly with the following:

- Predefined a few job items in the job request list for users to play around with
- Implemented 'Delete' feature in the job request list
- Created GitHub repository and GitHub page for the application
