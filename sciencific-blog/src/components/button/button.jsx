import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({children, className, width, ...props}) => (
    <button className={className} {...props}>
        {children}
    </button>
)

export const Button = styled(ButtonContainer)`
  width: ${({width = '100%'}) => width};
  height: 32px;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #000;
  background-color: rgb(185, 210, 252);

  &:hover {
    cursor: ${({disabled}) => disabled ? 'default' : 'pointer'};
  }
`

Button.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
}