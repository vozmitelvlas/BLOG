import {TableRow} from "../table-row/table-row.jsx";
import {useServerRequest} from "../../../../hooks";
import {Icon} from "../../../../components";
import {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {PROP_TYPE} from "../../../../constants/index.js";

const UserRowContainer = ({className, id, login, registeredAt, roleId: userRoleId, roles, onUserRemove}) => {
    const requestServer = useServerRequest()
    const [selectedRoleId, setSelectedRoleId] = useState(+userRoleId)
    const [initialRoleId, setInitialRoleId] = useState(+userRoleId)

    const onRoleChange = ({target}) => setSelectedRoleId(+target.value)

    const onRoleSave = (userId, selectedRoleId) => {
        requestServer('updateUserRole', userId, selectedRoleId).then(() =>
            setInitialRoleId(selectedRoleId)
        )
    }

    const isSaveButtonDisabled = selectedRoleId === initialRoleId

    return (
        <div className={className}>
            <TableRow border={true}>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                <div>
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(role => (
                            <option value={role.id} key={role.id}>{role.name}</option>
                        ))}
                    </select>
                    <Icon
                        disabled={isSaveButtonDisabled}
                        id="fa-floppy-o"
                        margin=" 0 0 0 10px"
                        onClick={() => onRoleSave(id, selectedRoleId)}
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