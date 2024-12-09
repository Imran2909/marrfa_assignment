import React from 'react'
import { Routes, Route } from 'react-router-dom'
import  AddBlog  from "../components/AddBlog"
import  GetBlog  from "../components/GetBlog"

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GetBlog />} />
            <Route path="/getBlog" element={<GetBlog />} />
            <Route path="/addBlog" element={<AddBlog />} />
        </Routes>
    )
}

export default AllRoutes
