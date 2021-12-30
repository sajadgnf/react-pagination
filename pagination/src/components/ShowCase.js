import React, { useEffect, useState } from "react"

// api
import { getData } from "../services/api"

// component
import User from "./User"
import Pagination from './Pagination'

const ShowCase = () => {

    const getStorageTheme = () => {
        let theme = "light-theme"

        if (localStorage.getItem("theme")) {
            theme = localStorage.getItem('theme')
        }
        return theme
    }

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(10)
    const [theme, setTheme] = useState(getStorageTheme())

    useEffect(() => {
        const fetchAPI = async () => {
            setUsers(await getData())
            setLoading(false)
        }

        fetchAPI()
    }, [])

    //get the theme mode
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

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

    // theme handler
    const themeHandler = () => {
        if (theme === "light-theme") {
            setTheme("dark-theme")
        } else {
            setTheme("light-theme")
        }
    }

    return (
        <div className={`container ${theme === "dark-theme" && "darkContainer"}`}>
            <h1 className='title'>Pagination</h1>
            <button
                onClick={themeHandler}
                className={`themeBtn ${theme === "dark-theme" && 'darkThemeBtn'}`}
            >
                {theme === "dark-theme" ? 'LIGHT' : 'DARK'}
            </button>
            {
                loading ?
                    <p>Loading...</p> :
                    <>
                        <div className={`cards ${theme === "dark-theme" && 'darkCards'}`}>
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
                            theme={theme}
                        />
                    </>
            }
        </div>
    )
}

export default ShowCase