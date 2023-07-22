# Social Network Prototype - README

This project is a prototype of a social network that implements basic functionalities to interact with users, albums, and tasks (TODOs). The web application has been developed as a frontend using HTML, CSS, and JavaScript and makes use of different APIs provided by the client to obtain and manage backend data.

## Functionalities

1. **View with list of users:**
   - Displays a list of users obtained from the provided API.
   - Each user has a link to their detail page.

2. **User Detail View:**
   - Displays detailed information about a selected user:
     - Name, username, email, city, and website.
     - Name of the company where the user works.
     - List of user's albums, showing the thumbnail of the first photo in each album.
     - List of TODOs associated with the user, with the ability to modify them.

3. **Recently Visited Albums:**
   - On the homepage, it shows a list of recently visited albums by the user.
   - The information about recently visited albums persists between sessions.

4. **Modification of TODOs:**
   - Allows adding elements to the user's TODO list, validating that only text without numbers is entered.
   - Allows deleting elements from the TODO list.

5. **TODOs Search:**
   - Allows filtering the TODO list by text reactively.

## APIs

The following backend APIs have been used to obtain and manage the necessary data for the application:

1. Users API: `https://jsonplaceholder.typicode.com/users/`
2. Albums API: `https://jsonplaceholder.typicode.com/users/{userId}/albums`
3. Photos API: `https://jsonplaceholder.typicode.com/photos`
4. TODOs API: `https://jsonplaceholder.typicode.com/todos/`

## Technologies Used

The frontend has been developed using the following technologies:

- HTML5 for the page structure.
- CSS3 for design and styling of the interface.
- JavaScript for implementing logic and interactive functionalities.
- Reactivity for the TODOs search.

## Data Persistence

The information about recently visited albums is stored in the local memory of the browser, which allows this information to persist between user sessions. This means that even if the page is refreshed or reloaded (e.g., with F5), the recently visited albums will continue to be displayed.

## Usage Instructions

1. Clone the repository or download the source code.
2. Run NPM install to install dependencies.
3. Execute npm run dev to run the project.
4. Explore the social network, interact with users, albums, and TODOs.

## Notes

- This project is a prototype and does not represent a complete application ready for production.
- The APIs provided by the client are used for demonstration purposes and may be subject to changes or not available in the future.

## Credits

This social network prototype has been developed by Alexwing.

For more information or to get in touch, please visit https://aaranda.es
