"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store";
import Session from "./Session";
import AccountNavigation from "./Navigation";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz" className="d-flex">
          <div className="d-none d-md-block me-4">
            <AccountNavigation />
          </div>
          <div className="flex-fill">{children}</div>
        </div>
      </Session>
    </Provider>
  );
}
