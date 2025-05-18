import './App.css'
import styled from "styled-components"
import {Routes, Route} from "react-router-dom";

const Content = styled.div`
  padding: 120px 0;
`
const H2 = styled.h2`
    text-align: center;
`
export const Header = () => <div>Шапка</div>
export const Footer = () => <div>Подвал</div>

function Blog() {
    return (
        <>
            <Header />
            <Content>
                <H2>Контент страницы</H2>
                <Routes>
                    <Route path="/" element={<div>Главная страница</div>}></Route>
                    <Route path="/login" element={<div>Авторизация</div>}></Route>
                    <Route path="/register" element={<div>Регистрация</div>}></Route>
                    <Route path="/users" element={<div>Пользователи</div>}></Route>
                    <Route path="/post/:postId" element={<div>Статья</div>}></Route>
                    <Route path="/post" element={<div>Новая статья</div>}></Route>
                    <Route path="*" element={<div>Ошибка</div>}></Route>
                </Routes>
            </Content>
            <Footer />
        </>
    )
}

export default Blog
