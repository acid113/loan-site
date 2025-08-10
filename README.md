# Loan Site

This is a simple React site using the Loan Service as backend.

Tech stack: React (TypeScript) created with Vite, Shadcn for UI components, React Router for basic routing

## Project Structure

```
site
├── src
│   ├── components
│   ├── features
│   ├── lib
│   ├── pages
│   ├── styles
├── .env
├── App.tsx
├── main.tsx
├── package.json
└── README.md
```

## Installation

To install the necessary dependencies, run:

```bash
yarn
```

## Environment file setup

.env

```
VITE_BASE_URL=http://localhost:3000/api
```

_Note: This URL used to access the service endpoints_

## Run the site

### Dev mode

To start the site in development mode, run this command

```bash
yarn dev
```

The site will be running on `http://localhost:5173`.

### Preview mode

To test the production version of your app locally

```bash
yarn preview
```

The site will be running on `http://localhost:4173`.

## License

This project is licensed under the MIT License.
