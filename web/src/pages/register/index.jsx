import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Box,
} from "@chakra-ui/react";

import "./styles.css";

export default function Register() {
  return (
    <div className="container">
      <div className="registerBox">
        <Box className="title">CRIE SUA CONTA</Box>
          <FormControl isRequired>
            <div className="inputGroup">
              <FormLabel className="loginLabel">Nome</FormLabel>
              <Input type="text" placeholder="Digite seu nome" variant="filled"/>
            </div>
            <div className="inputGroup">
              <FormLabel className="loginLabel">Email</FormLabel>
              <Input type="email" placeholder="exemplo@exemplo.com" variant="filled"/>
            </div>
            <div className="inputGroup">
              <FormLabel className="loginLabel">Senha</FormLabel>
              <Input type="password" placeholder="Digite sua senha" variant="filled" />
            </div>
            <div className="inputGroup">
              <FormLabel className="loginLabel">Url da foto</FormLabel>
              <Input
                type="text"
                placeholder="https://github.com/user-profile.png"
                variant="filled"
              />
              <FormHelperText className="helperText">
                <Link to="/">Já possui uma conta? Clique aqui para se logar!</Link>
              </FormHelperText>
            </div>
            <Button colorScheme="whatsapp">Criar</Button>
          </FormControl>
      </div>
    </div>
  );
}
