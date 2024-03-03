This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the todo app

This is a very basic app that allows crud operation on todo.
User can filter the todos list by todo status.

The main component is App.jsx
 - It renders a button which on click opens up form to add a todo.
 - It renders option to filter the list.
 - It render the list of all todos.
 - The add todo form is rendered inside a modal. This form serves the purpose of updating a todo also if it receives an id.
 - User can delete any todo; and this component renders confirmation dialog to ensure user don't delete it by mistake.

Insetead of firebase/node I've used the localstorage as I wanted to create it as a simple react web app.
All the operations to localStorage are done in helper.js file. This allows us to change it to firebase or node without even touching any of the component file.

This basic app makes use of material ui components.
