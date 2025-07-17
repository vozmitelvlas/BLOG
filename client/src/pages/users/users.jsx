import {UserRow, TableRow} from "./components";
import {PrivateContent, H2} from "../../components";
import {useEffect, useState} from "react";
import styled from 'styled-components';
import {ROLE} from "../../constants";
import {checkAccess} from "../../utils";

const UsersContainer = ({className}) => {
    const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const userRole = useSelector(selectUserRole)

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) return

        Promise.all([
            apiClient('/users'),
            apiClient('/users/roles'),
        ]).then(([usersRes, rolesRes]) => {
            if (usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error)
                return
            }
            setUsers(usersRes.data)
            setRoles(rolesRes.data)
        })
    }, [shouldUpdateUsers, userRole])

    const onUserRemove = (id) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) return

        apiClient(`/users/${id}`, 'DELETE').then(() =>
            setShouldUpdateUsers(!shouldUpdateUsers)
        )
    }

    return (
        <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
            <div className={className}>
                <H2>Пользователи</H2>
                <div>
                    <TableRow>
                        <div className="login-column">Логин</div>
                        <div className="registered-at-column">Дата регистрации</div>
                        <div className="role-column">Роль</div>
                    </TableRow>
                    {users.map(({id, login, registeredAt, roleId}) => (
                        <UserRow
                            key={id}
                            id={id}
                            login={login}
                            registeredAt={registeredAt}
                            roleId={roleId}
                            roles={roles.filter(({id: roleId}) => +roleId !== ROLE.GUEST)}
                            onUserRemove={() => onUserRemove(id)}
                        />
                    ))}
                </div>
            </div>
        </PrivateContent>
    )
}
import {useSelector} from "react-redux";


import {selectUserRole} from "../../selectors";
import apiClient from "../../utils/apiClient.js";

export const Users = styled(UsersContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 570px;
`