import styled from "styled-components";
import {PROP_TYPE} from "../../../../constants/index.js";
import PropTypes from "prop-types";

const TableRowContainer = ({className, children}) =>
    <div className={className}>{children}</div>


export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;
  border: ${({border}) => (border ? '1px solid #000' : 'none')};

  & > div {
    display: flex;
    padding: 0 10px;
  }

  .login-column {
    width: 172px;
  }

  .registered-at-column {
    width: 213px;
  }

  .role-column {
    width: auto;
  }
`

TableRow.propTypes = {
    children: PropTypes.node.isRequired
}