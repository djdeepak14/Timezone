# 🕒 Timezone Converter (React + Vite)

<p align="center">
  A responsive timezone converter built with React and Vite that lets you view current times across different timezones in real time.
</p>

<p align="center">
  🌐 Live demo: <a href="https://timezone-pink.vercel.app" target="_blank">https://timezone-pink.vercel.app</a>  
  *(Hosted on Vercel):contentReference[oaicite:2]{index=2}*
</p>

---

## 📌 About The Project

This project is a **Timezone Converter web application** built using **React** and **Vite**.  
It allows users to select timezones and instantly see the corresponding current times in each selected timezone.

It’s ideal as:
- A utility tool for scheduling
- A reference for global communication
- A learning project for timezone handling in React apps

---

## 🛠️ Technologies Used

| Technology | Description |
|------------|-------------|
| **React** | Frontend library for building UI |
| **Vite** | Fast development build tool |
| **JavaScript** | Core language |
| **HTML & CSS** | Structure and design |
| **Browser Intl API** | For timezone-aware Date formatting |

---

## 📂 Project Structure

```text
Timezone/
│
├── public/                # Static assets & public HTML
├── src/                   # React app source code
│   ├── components/        # Reusable UI components (if any)
│   ├── App.jsx            # Main React component
│   ├── index.jsx          # App entry point
│   └── styles.css         # App CSS
│
├── .gitignore
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation






# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
