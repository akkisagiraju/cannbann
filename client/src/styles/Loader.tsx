import styled from 'styled-components';

const Loader = styled.div<{ primary?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #ccc;
  border-top: ${(props) =>
    props.primary ? '3px solid #5AAC44' : '3px solid #000'};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
