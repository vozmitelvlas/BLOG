import {UserRow, TableRow} from "./components/index.js";
import {Content, H2} from "../../components/index.js";
import {useServerRequest} from "../../hooks";
import {useEffect, useState} from "react";
import styled from 'styled-components';
import {ROLE} from "../../constants/index.js";


const UsersContainer = ({className}) => {
    const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const requestServer = useServerRequest()
    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        Promise.all([
            requestServer('fetchUsers'),
            requestServer('fetchRoles'),
        ]).then(([usersRes, rolesRes]) => {
            if (usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error)
                return
            }
            setUsers(usersRes.res)
            setRoles(rolesRes.res)
        })
    }, [requestServer, shouldUpdateUsers])

    const onUserRemove = (userId) => {
        requestServer('removeUser', userId).then(() =>
            setShouldUpdateUsers(!shouldUpdateUsers)
        )
    }

    return (
        <div className={className}>
            <Content error={errorMessage}>
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
            </Content>
        </div>
    )
}

export const Users = styled(UsersContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 570px;
  font-size: 18px;
`