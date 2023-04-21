import React, {useState} from 'react';
import styled from "styled-components";
import { useIonRouter } from "@ionic/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
    const [username, setUsername] = useState("");
    const data = {
      email: username,
    };
    const navigate = useNavigate();
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    function sendData(){
      console.log('je passe')
      axios.post("http://localhost:3000/auth/forgot-password", data)
    .then((response: { data: any; }) => {
      navigate('/confirmresetpassword', { replace: true });
      console.log(response.data);
    })
    .catch((error: any) => {
    console.error(error);
    });
    } 
    const router = useIonRouter();


    return (
        <Body>
            <StyledCard>
                <h2>Modifier votre mot de passe</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInput
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <StyledButton 
                    onClick={sendData}
                      type="submit">Validate account</StyledButton>
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

export default ResetPassword;
