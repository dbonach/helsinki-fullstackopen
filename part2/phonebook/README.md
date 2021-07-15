## Simple Phonebook App

This is my implementation to problems 2.15 ~ 2.20 from [FullStackOpen](https://fullstackopen.com/en/)

It's a simple application that display and saves new contacts to the [JSON Server](https://github.com/typicode/json-server)

<br/>

### How it works

- The input filters and shows the contacts that match with the partial name being typed.
- If a new name is added, a post request will be generated and from its response the app state will be updated with the new contact.
- If the name already exists a put request will be generated to update the contact, from the response the app state will be updated with the new info.
- Clicking on `remove` will generate a delete request to the JSON Server and then the app state will be updated.
- When a contact is added a success message is shown.
- If the user tries to remove a contact that was already removed, an error message will be shown.

<br/>

### How to run

You can run it locally by cloning all the repo files, navigating to `helsinki-fullstackopen/part2/phonebook`, run `npm install` to install all dependencies and then run `npm run server` to run the JSON Server and `npm start`.

<br/>

### Gif showing it working 
<p>
<img src="https://user-images.githubusercontent.com/62313672/124419635-40cac300-dd34-11eb-8737-c1c6ba9bbfd9.gif" width="40%">
</p>
