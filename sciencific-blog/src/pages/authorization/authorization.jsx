import {useForm} from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {server} from "../../bff";
import {useState} from "react";
import {Button, H2, Input} from "../../components";
import {Link} from "react-router-dom";
import {setUser} from "../../actions";
import {useDispatch} from "react-redux";
import styled from "styled-components";

const authFormSchema = yup.object().shape({
    login: yup.string()
        .required('Заполните логин')
        .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
        .min(3, 'Неверно заполнен логин. Минимум 3 символа')
        .max(15, 'Неверно заполнен логин. Максимум 15 символов'),

    password: yup.string()
        .required('Заполните пароль')
        .matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры  и знаки # %')
        .min(6, 'Неверно заполнен пароль. Минимум 6 символа')
        .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
})

const AuthorizationContainer = ({className}) => {
    const dispatch = useDispatch()
    const [serverError, setServerError] = useState('')
    const {handleSubmit, register, formState} = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema)
    })

    const onSubmit = async ({login, password}) => {
        server.authorize(login, password).then(({error, res}) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`)
                return
            }
            dispatch(setUser(res))
        })
    }
    const formError = Object.values(formState.errors)[0]?.message
    const errorMessage = formError || serverError

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Логин..." {...register('login', {
                    onChange: () => setServerError(""),
                })}/>
                <Input type="password" placeholder="Пароль..." {...register('password', {
                    onChange: () => setServerError(""),
                })}/>
                <Button type="submit" disabled={!!formError}>Авторизоваться</Button>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <StyledLink to="/register">Регистрация</StyledLink>
            </form>
        </div>
    )
}

export const ErrorMessage = styled.div`
  background-color: #fcadad;
  font-size: 16px;
  margin: 10px 0 0;
  padding: 10px;
`

export const StyledLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  margin: 20px 0;
  font-size: 18px;
`

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`