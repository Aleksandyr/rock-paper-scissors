# Rock Paper Scissors Game
Rock-Paper-Scissors is a game played to settle disputes between two people. 

The game is played with three possible hand signals that represent a rock, paper, and scissors. The rock is a closed fist, paper is a flat hand with fingers and thumb extended and the palm facing downward, and scissors is a fist with the index and middle fingers fully extended toward the opposing player.

Rock wins against scissors, paper wins against rock, and scissors wins against paper. If both players throw the same hand signal, it is considered a tie, and play resumes until there is a clear winner.

## Tech stack
**`React`** | **`Typescript`** | **`Redux-Toolkit`** | **`Redux-saga`** | **`Express`** | **`Sqlite`**
## How to run
1. run `yarn install` on root directory
2. run `yarn start` 

## Authentication
#### Initially there are five seeded users:
    1. username: User-1 | password: Pass-1
    2. username: User-2 | password: Pass-2
    3. username: User-3 | password: Pass-3
    4. username: User-4 | password: Pass-4
    5. username: User-5 | password: Pass-5
    
**_NOTE:_**  You can choose playing with them or create your own account.


## Tests
- [ ] Battle Field:
    - [x] Ui
        - [X] Check if the component is rendered
        - [x] Should select {rock, paper, scissors} when user click's {rock, paper, scissors}
    - [x] Redux store
        - [x] User should win when faced user:rock to computer:scissors
        - [x] User should lose when faced user:paper to computer:scissors
        - [x] Computer should choose paper when store sends paper
    - [x] Integration
        - [x] Check result if server sends that you lost.
- [ ] Auth Form:
    - [X] Redux-saga
        - [x] Login update token with action call
        - [x] Login update call with mocked API call
## Tests TODO
- [ ] Test all server endpoints 
- [ ] Test all redux-saga generator funcs
- [ ] Test all state responses
- [ ] Test all React components
- [ ] Integration - test all user/computer interactions
