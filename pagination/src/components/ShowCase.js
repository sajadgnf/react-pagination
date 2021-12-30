import React, { useEffect, useState } from "react"

// api
import { getData } from "../services/api"

// component
import User from "./User"
import Pagination from './Pagination'

const ShowCase = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(10)

    useEffect(() => {
        const fetchAPI = async () => {
            setUsers(await getData())
            setLoading(false)
        }

        fetchAPI()
    }, [])

    // get current page
    const indexOfLastPage = currentPage * usersPerPage
    const indexOfFirstPage = indexOfLastPage - usersPerPage
    const currentUsers = users.slice(indexOfFirstPage, indexOfLastPage)

    // Change pages
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const changePage = (event, number) => {
        if (event.target.classList.contains("prev")) {
            setCurrentPage((oldPage) => {
                let prevPage = oldPage - 1
                if (prevPage < 1) {
                    prevPage = number 
                }
                return prevPage
            })
        } else {
            setCurrentPage((oldPage) => {
                let nextPage = oldPage + 1
                if (nextPage > number) {
                    nextPage = 1
                }
                return nextPage
            })
        }
    }

    return (
        <div className="container">
            <h1 className="title">Pagination</h1>
            {
                loading ?
                    <p>Loading...</p> :
                    <>
                        <div className="cards">
                            {currentUsers.map(user =>
                                <User key={user.id}
                                    name={user.login}
                                    avatar={user.avatar_url}
                                    url={user.html_url}
                                />
                            )}
                        </div>
                        <Pagination
                            totalUsers={users.length}
                            usersPerPage={usersPerPage}
                            paginate={paginate}
                            changePage={changePage}
                            currentPage={currentPage}
                        />
                    </>
            }
        </div>
    )
}

export default ShowCase