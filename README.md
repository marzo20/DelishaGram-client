# DelishaGram
### Phone Eats First
Introduction/Description:
Have you ever been scrolling through your Instagram and thought, "Why is my feed full of insta-thots? Where's the food?" Well you'll be downright giddy to hear that the fellas over at Team Codeplay have developed the perfect app to satisfy all your foodie needs. Upon login you'll be directed to a home page that shows a random post from a user with a link that navigates to a page that shows your own posts and a link that allows you to make a new post, as well as one to edit a post. Additionally there will be a search function that allows you to search by dish to see all the posts associated with that dish. Finally, we will also provide the ability to make edits to your account information. With all of this said and done, have a blast navigating through this plethora of food porn. And don't forget, Phone Eats First!

Team Members:
- Jack Wyman
- Billy Lu
- Wonjune Jung

## User Stories
- As a unregistered user, I would like to sign up or log in
- As a registered user, I would like to sign in with username and password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to add a post to my wall
- As a signed in user, I would like to update a post on my wall
- As a signed in user, I would like to delete a post on my wall
- As a signed in user, I would like to see all my posts
- As a signed in user, I would like to view a list of other users and view their walls
- As a signed in user, I would like to "like/favorite" other use's posts

## Wire Frames


## ERD


## Planned RESTful Routes
| VERB | URL pattern | Action \(CRUD\) | Description |
| :--- | :--- | :--- | :--- |
| POST | /users/login|\(Read\) | Check authentication and authorize |
| GET | /users/register |\(READ\) | Show Sign Up Page |
| POST | /users/register |\(Create\) | Create User/authentication and authorization |
| PUT | /users/edit |\(Update\) | Route to Update profile Info in DB |
| PUT | /users/changepassword |\(Update\) | Route to Update Password in DB |
| GET | /users/logout |\(Read\) | logout |
| GET | /users/profile |\(Read\) | Shows users profile Page |
| PUT | /users/profile |\(UPDATE\) | Update user's profile |
| PUT | /users/changepassword |\(UPDATE\) | Change user's password |
| GET | /post |\(Read\) | Show all of user's posts|
| POST | /posts |\(Create\) | Create a post about a dish |
| GET | /posts/:id |\(READ\) | Show details about a dish post|
| PUT | /post/:id |\(UPDATE\) | Edit selected post|
| DELETE | /post/:id |\(DELETE\) | Delete the post |
| GET | /posts/search/:dishname |\(Read\) | show search results |


## MVP Requirements
- Create Sign-Up, Login pages
- Create New Post page and Edit Post page for user posts
- Create page that shows all of user's posts 
- Create Edit User Info page
- Allow user to search for dishes and show dishes results page

## Stretch Goals
- Allow user to search by restaurant and by user in addition to being able to search by dish
- Create page that shows all results for a certain restaurant
- Create page that shows all results for a certain user
- Allow user to favorite dishes and create page that shows all the dishes a user has favorited
- Upload an image
- Show that image when a dish is rendered

## Technologies to be used
- Yelp API
- Cloudinary API (stretch)
- MongoDB
- Express
- React
- Node
- Mongoose
- Axios
- Cors

## Challenges Anticipated
- Uploading and rendering pictures
- 