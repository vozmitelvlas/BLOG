import './App.css'
import styled from "styled-components"
import {Routes, Route} from "react-router-dom";
import {Header, Footer} from "./components";
import {Authorization, Registration, Users} from "./pages";

const Page = styled.div`
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

            <Page>
                <Routes>
                    <Route path="/" element={<div>Главная страница</div>}></Route>
                    <Route path="/login" element={<Authorization />}></Route>
                    <Route path="/register" element={<Registration />}></Route>
                    <Route path="/users" element={<Users />}></Route>
                    <Route path="/post/:postId" element={<div>Статья</div>}></Route>
                    <Route path="/post" element={<div>Новая статья</div>}></Route>
                    <Route path="*" element={<div>Ошибка</div>}></Route>
                </Routes>
            </Page>

            <Footer/>
        </AppColumn>
    )
}

export default Blog
