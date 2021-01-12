import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Button, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

function RegistForm({ status, onSubmit, validateName, validatePrice, validateQuantity }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("R$ ");
  const [quantity, setQuantity] = useState("");

  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({
    name: {
      isValid: true,
      message: ""
    },
    price: {
      isValid: true,
      message: ""
    },
    quantity: {
      isValid: true,
      message: ""
    },
    submit: {
      sucess: true,
      message: "O produto foi cadastrado com sucesso!",
      severity: "success",
    },
  });


  return (
    <form onSubmit=
      {async event => {
          event.preventDefault();
          await onSubmit({name, price, quantity});
          console.log(status)
          if(status === true) {
            setName("");
            setPrice("R$ ");
            setQuantity("");
            setOpen(true);
            setErrors({
              ...errors,
              submit: {
                sucess: true,
                message: "O produto foi cadastrado com sucesso!",
                severity: "success",
              },
            });
          } else {
            console.log(status)
            setOpen(true);
            setErrors({
              ...errors,
              submit: {
                sucess: false,
                message: "Erro ao cadastrar o produto!",
                severity: "error",
              },
            });
          }
        }
      }
    >
      <TextField
        id="name"
        value={name}
        label="Nome do Produto"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={event => setName(event.target.value)}
        error={!errors.name.isValid}
        helperText={errors.name.message}
        onBlur={() => {
            const valid = validateName(name);
            setErrors({...errors, name: valid});
          }
        }
        required
      />
      <TextField
        id="price"
        value={price}
        label="Preço"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!errors.price.isValid}
        helperText={errors.price.message}
        onChange={event => setPrice(event.target.value)}
        onBlur={() => {
            const valid = validatePrice(price);
            setErrors({...errors, price: valid});
           }
         }
        required
      />
      <TextField
        id="quantity"
        value={quantity}
        label="Quantidade"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={event => setQuantity(event.target.value)}
        error={!errors.quantity.isValid}
        helperText={errors.quantity.message}
        onBlur={() => {
            const valid = validateQuantity(quantity);
            setErrors({...errors, quantity: valid});
          }
        }
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Cadastrar Produto
      </Button>
      
      <Collapse
        in={open}
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        <Alert
          severity={errors.submit.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errors.submit.message}
        </Alert>
      </Collapse>

    </form>
  );
}

export default RegistForm;
