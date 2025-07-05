import {H2} from "../h2/h2.jsx";
import styled from "styled-components";
import PropTypes from "prop-types";
import {PROP_TYPE} from "../../constants/index.js";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`

export const Error = ({error}) =>
    error && (
        <Div>
            <H2>Ошибка</H2>
            <div>{error}</div>
        </Div>
    )


Error.propTypes = {
    error: PROP_TYPE.ERROR,
}