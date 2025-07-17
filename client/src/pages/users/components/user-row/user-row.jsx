import {TableRow} from "../table-row/table-row.jsx";
import {Icon} from "../../../../components";
import {use, useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {PROP_TYPE} from "../../../../constants/index.js";
import apiClient from "../../../../utils/apiClient.js";

const UserRowContainer = ({className, id, login, registeredAt, roleId: userRoleId, roles, onUserRemove}) => {
    const [roleId, setRoleId] = useState(+userRoleId)
    const [initialRoleId, setInitialRoleId] = useState(+userRoleId)

    const onRoleChange = ({target}) => setRoleId(+target.value)

    const onRoleSave = (userId, roleId) => {
        apiClient(`/users/${userId}`, 'PATCH', {roleId}).then(() =>
            setInitialRoleId(roleId)
        )
    }

    const isSaveButtonDisabled = roleId === initialRoleId

    return (
        <div className={className}>
            <TableRow border={true}>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                <div>
                    <select value={roleId} onChange={onRoleChange}>
                        {roles.map(role => (
                            <option value={role.id} key={role.id}>{role.name}</option>
                        ))}
                    </select>
                    <Icon
                        disabled={isSaveButtonDisabled}
                        id="fa-floppy-o"
                        margin=" 0 0 0 10px"
                        onClick={() => onRoleSave(id, roleId)}
                    />
                </div>
            </TableRow>
            <Icon
                id="fa-trash-o"
                margin=" 0 0 0 10px"
                onClick={onUserRemove}
            />
        </div>
    )
}

export const UserRow = styled(UserRowContainer)`
  display: flex;
  margin-top: 10px;

  & select {
    font-size: 16px;
    padding: 0 0 0 5px;
  }
`

UserRow.propTypes = {
    id: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    registeredAt: PropTypes.string.isRequired,
    roleId: PROP_TYPE.ROLE_ID.isRequired,
    roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    onUserRemove: PropTypes.func.isRequired,
}