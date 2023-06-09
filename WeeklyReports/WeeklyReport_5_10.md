# Weekly Status Report May 10th


## Team report
### Previous week's goal
* Finish UI implementation and integrate with backend APIs
* Implement Frontend UI for User Profile page
* Use cloudflare R2 to store files and image information and connect to the project
* Implement api for filtering projects based on tag and user input
* Integrate the project functionalities and prepare for the alpha release


### Progress and Issues
* Implemented APIs to access data of a single user or project from the database
* Implemented API to post user and remove project from the database
* Implemented the essential functions for the alpha release
* Adjusted user account system structure so that each component can render the current user information correctly
* Fixed Frontend testing by mocking users
* Finish Alpha Release


### Plans and goals for the next week
* Implement the filter function to filter projects based on tags, locations, and roles, etc
* Use cloudflare R2 to store files and image information and connect to the project
* Adjust Account System UI and user experience
* Add interface for user to fill in user information after signing up


## Contributions of individual team members
### Previous week's goal
* Allan Ji: Create user profile page and connect with the backend and research about AWS service to store user files and images
* Bohan Wu: Implement majority of backend database interaction functionalities, including GET requests for searching and POST requests
* Caleb Huang: Finish search API and search function
* Zhengrui Sun: Connect the rest frontend backend interface and start refining bugs and styles.
* Yansong Liu, Dicheng Wu: Implement more APIs like add an user or project to database, and access information about a specific user or project


### Progress and Issues
* Allan Ji: Adjusted user account system structure so that each component can render the current user information correctly and fixed Frontend testing by mocking users
* Yansong Liu: Implement the APIs to update MongoDB when a new user is signed, and fixed minor bugs.
* Dicheng Wu: Implemented APIs to remove a project, and access information of a specific user.
* Bohan Wu: Implemented APIs to get a target project and to change uesr profile information; implemented project-detail page and user-profile page of logged-in user
* Caleb Huang: Finish search API and search function
* Zhengrui Sun: Modify the frontend UI, apply hooks, implement the pagination function, and access data by the pagination.


### Plans and goals for the next week
* Allan Ji: Adjust Account System UI and user experience and add interface for user to fill in user information after signing up
* Dicheng Wu, Yansong Liu: Use cloudflare R2 to store files and image information and connect to the project, Implement api for filtering  
  projects based on multiple constraints(like tags and locations)
* Bohan Wu: implement functionality to modify other parts of the user profile, will involve implementing new backend APIs and frontend functions
* Caleb Huang: Create a setting for user profile.
* Zhengrui Sun: Modify the UI for the login, main page, and expecially user profile.
