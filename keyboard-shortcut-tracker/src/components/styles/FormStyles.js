// styles/FormStyles.js
import styled from 'styled-components';

export const FormContainer = styled.main`
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;

    div {
      width: 300px;
      padding: 1rem;
      border-radius: 5px;
      background-color: #f0f0f0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }

      form {
        display: flex;
        flex-direction: column;

        div {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;

          label {
            font-weight: bold;
          }

          input {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
        }

        button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 5px;
          margin-top: 1rem;

          &:hover {
            background-color: #0056b3;
          }
        }
      }

      p {
        margin-top: 1rem;
        text-align: center;

        a {
          color: #007bff;
        }
      }
    }
  }
`;