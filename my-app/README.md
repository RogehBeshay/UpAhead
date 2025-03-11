
# ManageMate (UpAhead Exercise)

This is a simple task manager app built using React, Firebase, and optional integration with the OpenAI API. The app lets users sign in with Google, add tasks, mark them as complete, and see them in real-time.

I also added a fun touch by using OpenAI to generate random motivational messages or fun facts related to each task, to make the app more engaging.


## Features

- Users can add tasks, check tasks as complete, and see a list of all their tasks.
- Users can log in using their Google account, and their tasks are saved to their account.
- Tasks update in real-time across all devices using Firebase Firestore.
- The app shows random motivational or fun messages using OpenAI API, making it more fun and creative


## Lessons Learned

This was my first time using Firebase Firestore, and I had no experience with it before starting this project. I was a little confused at first about how Firestore works and how to use it with React, but after a bit of trial and error, I was able to figure it out.

Setting up Firestore to store tasks was tricky at first, especially because I wasn't sure how to organize the data. But once I understood how Firestore stores data in collections and documents, it became much easier.

Firebase Authentication (Google Sign-In) was also new to me. I had to figure out how to let users log in with Google and save their tasks to their account. I learned a lot about how Firebase Authentication works, and now I feel more comfortable with it.


## Installation

1) Clone the repository

```bash
  git clone https://github.com/RogehBeshay/UpAhead
  cd my-app
```

2) Install dependencies

```bash
  npm install
```
    
3) Run the app

```bash
  npm start
```