# Test task for SoftIndex
## Task description:
Create Single Page Application that includes form for user creating and table with the users.

Form. It has to include next fields:
  * First Name (string)
  * Last Name (string)
  * Phone (string)
  * Age (number)
Every input should have validation and errors preview. Form can be submitted only when there are any errors. After submitting form have to be cleared.

Table. It should have sorting by every field, records removing. Data should save in localStorage.

Stack: Reach, Less, Babel, Eslint, Git, Webpack, Express, Livr


## Run project on local server common settings
1. `cp config.json.sample config.json`
2. `npm install`

### For development mode use command
3. `npm run start:development`

### For production mode use commands
3. `npm run build`
4. `npm run start:production`
