import styled from "styled-components"
import {Routes, Route} from "react-router-dom";
import {Header, Footer, Modal, Error} from "./components";
import {Authorization, Registration, Users, Post, Main} from "./pages";
import {useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "./actions/";
import './App.css'
import {ERROR} from "./constants";
import apiClient from "./utils/apiClient.js";

const Page = styled.div`
  padding: 120px 0 20px;
`
const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
`

function Blog() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem('userData')

        if (!currentUserDataJSON) {
            return
        }
        const currentUserData = JSON.parse(currentUserDataJSON)

        dispatch(setUser({
            ...currentUserData,
            roleId: Number(currentUserData.roleId)
        }))
    }, [])

    return (
        <AppColumn>
            <Header/>

            <Page>
                <Routes>
                    <Route path="/" element={<Main/>}></Route>
                    <Route path="/login" element={<Authorization/>}></Route>
                    <Route path="/register" element={<Registration/>}></Route>
                    <Route path="/users" element={<Users/>}></Route>
                    <Route path="/post/:id" element={<Post/>}></Route>
                    <Route path="/post/:id/edit" element={<Post/>}></Route>
                    <Route path="/post" element={<Post/>}></Route>
                    <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST}/>}></Route>
                </Routes>
            </Page>

            <Footer/>
            <Modal/>
        </AppColumn>
    )
}

export default Blog
