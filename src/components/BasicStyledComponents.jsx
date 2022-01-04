import { Table } from "antd";
import styled from "styled-components";

export const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const Toolbar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  margin: 16px;
  flex-grow: 1;
`;

export const StyledTable = styled(Table)`
  flex-grow: 1;
`;
