# Frontend
This is the FrontEnd Repo for IdeaFactory. Our frontend is mainly built by React.js and use antdesign for the UI. The testing framework is Jest and React Testing Library.

## Set up Frontend
Before launching the frontend demo, one need to install all dependencies and packages. 

First, check your npm version. Our npm version is 9.5.1, and our node version is v19.9.0. You can check the version using `npm -v` and `node --version` to check if your npm version is same as ours. 

Then, run `npm install` in the root directory before running the program to make sure all packages are installed. You can check if all dependencies are installed by running `npm list`. The output should be like
```
├── @babel/preset-env@7.21.5
├── @babel/preset-react@7.18.6
├── @testing-library/jest-dom@5.16.5
├── @testing-library/react@14.0.0
├── @types/react-dom@18.2.1
├── @types/react@18.2.0
├── @vitejs/plugin-react@4.0.0
├── antd@5.4.6
├── axios@1.4.0
├── bootstrap@5.2.3
├── eslint-plugin-react-hooks@4.6.0
├── eslint-plugin-react-refresh@0.3.5
├── eslint-plugin-react@7.32.2
├── eslint@8.39.0
├── firebase@9.21.0
├── jest-environment-jsdom@29.5.0
├── jest@29.5.0
├── react-bootstrap@2.7.4
├── react-dom@18.2.0
├── react-router-dom@6.11.0
├── react@18.2.0
└── vite@4.3.3
```

## Launch the Frontend demo
To launch the program, run `npm run dev` in the terminal in the root directory. Then, go to the localhost shown in the terminal in the browser. This will show a raw frontend demo without backend.

## Test the Frontend
Before testing the program, make sure jest and jest-environment-jsdom are installed. To test the program, run `npm test`. This would run all tests in `./src/__tests__`

## Launch the integrated program
Follow the Readme.md in Backend repo first. To launch our integrated demo, run `node app.js` to launch the backend. Then, open another terminal, and run `npm run dev` to launch the frontend. Finally, open the localhost in the browser to check the demo.