import styled from "styled-components";
import {Icon, Button} from "../../../../components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ROLE} from "../../../../constants/index.js";
import {selectUserLogin, selectUserRole, selectUserSession} from "../../../../selectors";
import {logout} from "../../../../actions";

const ControlPanelContainer = ({className}) => {
    const navigate = useNavigate()
    const roleId = useSelector(selectUserRole)
    const login = useSelector(selectUserLogin)
    const session = useSelector(selectUserSession)
    const dispatch = useDispatch()

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <Button>
                        <Link to='/login'>Войти</Link>
                    </Button>
                ) : (
                    <>
                        <UserName>{login}</UserName>
                        <StyledIcon onClick={() => dispatch(logout(session))}>
                            <Icon id="fa-sign-out" margin="0 0 0 10px"/>
                        </StyledIcon>
                    </>
                )}

            </RightAligned>

            <RightAligned>
                <StyledIcon onClick={() => navigate(-1)}>
                    <Icon id="fa-backward" margin="10px 0 0 0"/>
                </StyledIcon>
                <Link to='/post'>
                    <Icon id="fa-file-text-o" margin="10px 0 0 16px"/>
                </Link>
                <Link to='/users'>
                    <Icon id="fa-users" margin="10px 0 0 16px"/>
                </Link>
            </RightAligned>
        </div>
    )
}

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const StyledIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const ControlPanel = styled(ControlPanelContainer)`

`