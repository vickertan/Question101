# To Do List

- [x] Show modal to provide topic selection for user to play when user click on "Topic" button menu

- [x] Create more robust and avoid repetition code between Topic and Create window component

- [x] Fix bug:

  - [x] playground page error when refreshing
    - [x] Deck component: invalid document reference (currently using logical OR operator to return 'anonymous' as default when user.uid is falsy)
    - [x] DeckButton component: not functioning properly (temporary solution: create default value just like in Deck component)
  - [x] Fix "Yes" border not rendering properly (CreateWindow > ExitConfirm component)

- [x] Show love icon on card when current user has it in his/her favorite list

- [x] Only verified user are allowed to upload questions

- [x] Create loading animation when reading data from Firestore

  - [x] when reading questions
  - [x] when reading user auth's state to display icon button
