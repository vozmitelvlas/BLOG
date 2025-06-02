import './App.css'
import styled from "styled-components"
import {Routes, Route} from "react-router-dom";
import {Header, Footer} from "./components";
import {Authorization} from "./pages";

const Content = styled.div`
  padding: 120px 0;
`
const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`

function Blog() {
    return (
        <AppColumn>
            <Header/>

            <Content>
                <Routes>
                    <Route path="/" element={<div>Главная страница</div>}></Route>
                    <Route path="/login" element={<Authorization/>}></Route>
                    <Route path="/register" element={<div>Регистрация</div>}></Route>
                    <Route path="/users" element={<div>Пользователи</div>}></Route>
                    <Route path="/post/:postId" element={<div>Статья</div>}></Route>
                    <Route path="/post" element={<div>Новая статья</div>}></Route>
                    <Route path="*" element={<div>Ошибка</div>}></Route>
                </Routes>
            </Content>

            <Footer/>
        </AppColumn>
    )
}

export default Blog
