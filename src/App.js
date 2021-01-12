import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import RegistForm from "./components/RegistForm/RegistForm";
import axios from "axios";

import "./App.css";

function App() {
  const [status, setStatus] = useState(true);

  return (
    <Container className="App" component="article" maxWidth="sm" style={{ marginTop: "50px" }} >
      <Typography variant="h4" align="center">
        Cadastro de Produtos
      </Typography>
      <RegistForm
        onSubmit={onSubmit}
        validateName={validateName}
        validatePrice={validatePrice}
        validateQuantity={validateQuantity}
        status={status}
      />
    </Container>
  );

  function onSubmit({ name, price, quantity }) {
    if(name.length > 0 && price.length > 3 && quantity > 0) {
      console.log("Produto:", { name, price, quantity });

      axios.post(`http://localhost:3000/products/create/`, { name, price, quantity })
        .then((res) => {
          console.log("Status:", res.status);
          if (res.status !== 200) {
            return setStatus(false);
          }
          else {
            return setStatus(true);
          }
        });

    } else {
      return setStatus(false);
    }
  }
}

function validateName(name) {
  if (name.length === 0) {
    return { isValid: false, message: "O nome do produto deve ser informado." };
  } else return { isValid: true, message: "" };
}

function validatePrice(price) {
  // TODO: - Máscara no preço - Formatar moeda (.toLocaleString)
  if(price.length <= 3) return {isValid: false, message: `O preço não foi informado.`};
  if(price.length <= 6) return {isValid: false, message: `O preço deve ser informado no formato 'R$ X.XXX,XX'.`};
  else return {isValid: true, message: ""};
}

function validateQuantity(quantity) {
  if (quantity <= 0) return { isValid: false, message: "A quantidade do produto deve ser maior que 0." };
  else return { isValid: true, message: "" };
}

export default App;
