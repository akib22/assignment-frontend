## Overview

A simple frontend for an e-commerce site. See [Live demo](https://assignment-shop-frontend.netlify.com/).

## Project setup

### Prerequisites

- On your system, you should have `node` (v16.14.0 lts) and `npm` (v8.3.1) installed. Install `node` and `npm` if you don't already have them.

### Clone the project

```
git clone https://github.com/akib22/assignment-frontend.git

cd assignment-frontend
```

### Install dependencies

```
npm i
```

### Setup environment variables

- Copy the `.env.example` file and paste it into root in project directory as `.env.local`.
- Open the `.env.local` file and set the `REACT_APP_BASE_URL`.

**NOTE:** Use [https://assignment-shop-backend.herokuapp.com/](https://assignment-shop-backend.herokuapp.com/) as `REACT_APP_BASE_URL`.

### Run the project

- Run the project

```
  npm start
```

### Run tests

```
  npm run test
```

### See linting warnings and errors

```
  npm run lint
```

### Fix linting warnings and errors

```
  npm run lint:fix
```

### Build the project

```
npm run build
```
