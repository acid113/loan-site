# Loan Site

This is a simple site connecting the Loan Service. 

Tech stack: React (TypeScript) created using Vite, Shadcn for UI components 

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
