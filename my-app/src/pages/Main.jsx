import React from 'react'
import styles from "../styles/main.module.css"
import AllRoutes from '../config/AllRoutes'
import Navbar from '../components/Navbar'

function Main() {
  return (
    <div  >
      <div className={styles.box} >
        <Navbar />
      </div>
      <div>
        <AllRoutes />
      </div>
    </div>
  )
}

export default Main
