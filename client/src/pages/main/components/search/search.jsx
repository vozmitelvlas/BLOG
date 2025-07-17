import {Icon, Input} from "../../../../components";
import styled from "styled-components";
import PropTypes from "prop-types";

const SearchContainer = ({className, searchPhrase, onChange, onFocus}) => {
    return (
        <div className={className}>
            <Input value={searchPhrase} onChange={onChange} onFocus={onFocus} placeholder="Поиск по заголовкам..."/>
            <Icon id="fa-search" size="21px" inactive={true}/>
        </div>
    )
}

export const Search = styled(SearchContainer)`
  display: flex;
  position: relative;
  width: 340px;
  height: 40px;
  margin: 40px auto 0;

  > input {
    padding: 10px 32px 10px 10px;
  }

  > div {
    position: absolute;
    right: 7px;
    top: 3px;
  }
`

Search.propTypes = {
    searchPhrase: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
}