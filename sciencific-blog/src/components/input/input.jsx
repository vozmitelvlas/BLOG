import styled from "styled-components";
import PropTypes from "prop-types";

const InputContainer = ({className, ...props}) =>
    <input className={className} {...props}/>

export const Input = styled(InputContainer)`
  width: ${({width = '100%'}) => width};
  height: 40px;
  border: 1px solid #000;
  margin: 0 0 10px;
  padding: 10px;
  font-size: 18px;
`

Input.propTypes = {
    width: PropTypes.string,
}