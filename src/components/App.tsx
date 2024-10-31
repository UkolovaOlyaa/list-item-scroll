import React from "react";
import styles from "../styles/App.module.css";
import { Main } from "./Main";

export const App: React.FC = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>GitHub Repository List</h1>
      <Main />
    </div>
  );
};
