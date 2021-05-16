import styled from "@emotion/styled";
export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header_title = styled.div`
  font-size: 70px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

export const Content_title = styled.div`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Content_textArea = styled.div`
  width: 100%;
  height: auto;
  min-height: 134px;
  vertical-align: bottom;
  transition: all 0.3s, height 0s;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 4px 11px;
  &:hover {
    border: 1px solid #40a9ff;
  }
  & div {
    font-size: 20px;
  }
`;

export const Footer_container = styled.div`
  display: flex;
  margin: auto 0 10px;
  justify-content: center;
`;

export const Footer = styled.a`
  display: inline-flex;
  color: black;
  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }
  &:active {
    color: black;
  }
  &:hover {
    opacity: 0.3;
    color: black;
  }
`;

export const Footer_svg = styled.svg`
  margin: 0 5px;
`;
