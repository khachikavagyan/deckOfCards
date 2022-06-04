<h1 align="center">Deck of Playing Cards</h1>

## Quick Start
Set the environment variables:
(You can see all enviroment key at **src/config/config**)
```bash
cp .env.example .env
```

## Commands
Running locally:
```bash
npm start
```
building:
```bash
npm run build
```

Testing:
```bash
# run all unit tests
npm run test

# run all e2e tests
npm run test:e2e
```

## Enviroment Variable
The environment variables can be found and modified in the  `.env`  file. They come with these default values:

```bash
# Port number
APP_PORT=9000

# Prefix app path
APP_PREFIX_PATH=/

# Database config

# If you want to use database URI with DB_URI
DB_URI=mongodb://localhost:27017/katana

# If you want to use seperate database URI
DB_HOST=localhost
DB_NAME=conduit
DB_PORT=27017
```

## Project Structure
This project don't have **controllers** and **services** folders because we want to minimalized. If you want them, you can create it
```bash
src\
 |--config\         # Environment variables and configuration related things
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
```

## Error handling
The app has a centralized error handling mechanism.

Routes should try to catch the errors and forward them to the error handling middleware (by calling `next(e)`).

```ts
router.post('/deck', async (req, res, next) => {
	try {
		const payload = req.body
		const deck = await User.findOne(payload)
		if (!deck)
		throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid payload')
		res.json(deck)
	} catch (e) {
		next(e)
	}
})
```

The error handling middleware sends an error response, which has the following format:
```json
{
  "code": 401,
  "message": "Invalid parameters"
}
```
When running in development mode, the error response also contains the error stack.


## Linting
Linting is done using  [ESLint](https://eslint.org/)  and  [Prettier](https://prettier.io/).

In this app, ESLint is configured to follow the  [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)  with some modifications. It also extends  [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)  to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the  `.eslintrc.json`  file. To modify the Prettier configuration, update the  `.prettierrc.json`  file.

To prevent a certain file or directory from being linted, add it to  `.eslintignore`  and  `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains  `.editorconfig`
