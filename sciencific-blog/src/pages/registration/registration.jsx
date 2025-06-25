import {useForm} from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {server} from "../../bff";
import {useState} from "react";
import {AuthFormError, Button, H2, Input} from "../../components";
import {Navigate} from "react-router-dom";
import {setUser} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {ROLE} from "../../constants/index.js";
import {selectUserRole} from "../../selectors";
import {useResetForm} from "../../hooks";

const regFormSchema = yup.object().shape({
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

    passcheck: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
})

const RegistrationContainer = ({className}) => {
    const dispatch = useDispatch()
    const [serverError, setServerError] = useState('')
    const roleId = useSelector(selectUserRole)
    const {handleSubmit, register, formState, reset} = useForm({
        defaultValues: {
            login: "",
            password: "",
            passcheck: "",
        },
        resolver: yupResolver(regFormSchema)
    })

    useResetForm(reset)

    const onSubmit = async ({login, password}) => {
        server.register(login, password).then(({error, res}) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`)
                return
            }
            dispatch(setUser(res))
            sessionStorage.setItem('userData', JSON.stringify(res))
        })
    }
    const formError = Object.values(formState.errors)[0]?.message
    const errorMessage = formError || serverError

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Логин..." {...register('login', {
                    onChange: () => setServerError(""),
                })}/>
                <Input type="password" placeholder="Пароль..." {...register('password', {
                    onChange: () => setServerError(""),
                })}/>
                <Input type="password" placeholder="Проверка пароля..." {...register('passcheck', {
                    onChange: () => setServerError(""),
                })}/>
                <Button type="submit" disabled={!!formError}>Зарегистрироваться</Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    )
}

export const Registration = styled(RegistrationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`