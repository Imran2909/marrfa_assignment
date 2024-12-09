import React from 'react';
import styles from '../styles/spinner.module.css'; 

function Spinner() {
  return (
    <div className={styles.spinnerContainer}> {/* Container to hold spinner and message */}
      <div className={styles.spinner}></div> {/* The actual spinner element */}
      <p>Please wait for some moments.....</p> {/* Message displayed below the spinner */}
    </div>
  );
}

export default Spinner;
