import React, {useState} from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const LoginCard = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const data = {
      email: username,
      password: password
    };
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
    };
    const navigate = useNavigate();

    function sendData(){
      console.log('je passe')
      axios.post("http://localhost:3000/auth/login", data)
    .then((response: { data: any; }) => {
      navigate('/', { replace: true });
    console.log(response.data);
  })
  .catch((error: any) => {
    console.error(error);
  });
  }

    return (
        <Body>
            <StyledCard>
                <h2>Login BEWBEWWWW</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInput
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <StyledInput
                        type="password"
                        placeholder="comment ça pas mal les bzeez"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledButton onClick={sendData} type="submit">Login</StyledButton>
                </StyledForm>
            </StyledCard>
        </Body>
    );
};


const Body = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1d3a59;
  `;

const StyledCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #244569;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;

export default LoginCard;
