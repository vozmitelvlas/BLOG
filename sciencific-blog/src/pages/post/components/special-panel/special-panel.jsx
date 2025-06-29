import {Icon} from "../../../../components";
import {CLOSE_MODAL, openModal, removePostAsync} from "../../../../actions";
import {useDispatch} from "react-redux";
import {useServerRequest} from "../../../../hooks/index.js";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const SpecialPanelContainer = ({className, publishedAt, editButton, id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const requestServer = useServerRequest()

    const onPostRemove = () => {
        dispatch(openModal({
            text: 'Удалить статью?',
            onConfirm: () => {
                dispatch(removePostAsync(requestServer, id)).then(() => {
                    navigate('/')
                })
                dispatch(CLOSE_MODAL)
            },
            onCancel: () => dispatch(CLOSE_MODAL)
        }))
    }

    return (
        <div className={className}>
            <div className="published-at">
                {publishedAt && <Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" inactive={true}/>}
                {publishedAt}
            </div>
            <div className="buttons">
                {editButton}
                {publishedAt && <Icon id="fa-trash-o" size="21px" margin="0 0 0 10px" onClick={() => onPostRemove(id)}/>}
            </div>
        </div>
    )
}

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;
  margin: ${({margin}) => margin};


  .buttons {
    display: flex;
  }


  .published-at {
    display: flex;
  }
`