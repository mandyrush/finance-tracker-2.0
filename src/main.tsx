import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { gray, blue, red, green } from "@radix-ui/colors";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
  },
};

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Theme>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ThemeProvider>
      </Theme>
    </React.StrictMode>
  );
});
