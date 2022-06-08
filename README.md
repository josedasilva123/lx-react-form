# LX React Form

O LX React Form é uma biblioteca brasileira de formulários para React criado em formato de hook.

Leve flexível e com diversas features a disposição, como: validação de diversos tipos de campos (input, checkbox, select), possibilidade de validação com regex, máscaras (padrões e costumizadas) e muito mais.

## Instalação

Você pode instalar o LX React Form como um pacote NPM utilizando o comando

```sh
npm install lx-react-form
```

ou

```sh
yarn add lx-react-form
```

## Exemplo completo

```jsx
import { useForm, useInput } from "lx-react-form";

const name = useInput({
  name: "name",
});

const email = useInput({
  name: "name",
  validation: "email",
});

const password = useInput({
  name: "password",
  validation: "senha",
});

const form = useForm({
  clearFields: true,
  formFields: [name, email, password],
  submitCallback: (formData) => {
    console.log(formData);
  },
});

return (
  <form onSubmit={form.handleSubmit}>
    <input type="text" {...name.inputProps} />
    {name.error && <p>{name.error}</p>}

    <input type="email" {...email.inputProps} />
    {email.error && <p>{email.error}</p>}

    <input type="password" {...password.inputProps} />
    {password.error && <p>{password.error}</p>}

    <button type="submit">Enviar</button>
  </form>
);
```

## (useInput) - Validações de input (text, email, number) ou textarea

Você pode validar esses tipos de campo com o hook `useInput`

```jsx
import { useInput } from "lx-react-form";

const example = useInput({
  name: "example",
  validation: "telefone",
  mask: "telefone",
});

return (
  <form>
    <input type="text" {...example.inputProps} maxLength={15} />
    {example.error && <p>{example.error}</p>}
  </form>
);
```

Confira abaixo todas as opções disponíveis para o hook `useInput`

| Opções           | Obrigatório | Descrição                                                                             |
| ---------------- | ----------- | ------------------------------------------------------------------------------------- |
| name             | Sim\*       | O nome do campo é essencial para identificação tanto no HTML quanto no hook `useForm` |
| optional         | Não         | Define se o campo é opcional ou não, padrão `false`.                                  |
| initialValue     | Não         | Define um valor inicial para o campo                                                  |
| same             | Não         | Permite relacionar campos, para exigir que o valor dos mesmos precise corresponder    |
| validation       | Não         | Utiliza uma validação padrão disponível: email, cep, senha, telefone                  |
| customValidation | Não         | Permite a utilização de regex próprio para validação                                  |
| mask             | Não         | Utiliza uma máscara padrão disponível: cep, cpf, cnpj, telefone, inteiros             |
| customMask       | Não         | Permite o uso de uma máscara customizada                                              |
| errorText        | Não         | Permite customizar a mensagens de erro de padrão: `required`, `same` e `minLength`    |

### Exemplo same

```jsx
import { useInput } from "lx-react-form";

const password = useInput({
  name: "password",
  validation: "senha",
});

const confirmpassword = useInput({
  name: "confirmpassword",
  same: example.value,
});

return (
  <form>
    <input type="password" {...password.inputProps} />
    {password.error && <p>{password.error}</p>}

    <input type="password" {...confirmpassword.inputProps} />
    {confirmpassword.error && <p>{confirmpassword.error}</p>}
  </form>
);
```

### Exemplo customValidation

Valida o campo comparando ao regex fornecido

```jsx
import { useInput } from "lx-react-form"

const password = useInput({
    name: "password",
    customValidation: {
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        error: "Sua senha precisa conter 8 caracteres, pelo menos uma letra e um número"
    }
})

return(
    <form>
        <input type="password" {...password.inputProps}/>
        {password.error && <p>{password.error}</p>}
    </form>
)
```

### Exemplo customMask

Aplica a máscara fornecida ao campo

```jsx
import { useInput } from "lx-react-form";

const birthDate = useInput({
  name: "birthdate",
  customMask: {
    expressions: [
      {
        regex: /\D/g,
        replace: "",
      },
      {
        regex: /(\d{2})(\d)/,
        replace: "$1/$2",
      },
      {
        regex: /(\d{2})(\d{4})/,
        replace: "$1/$2",
      },
    ],
  },
});

return (
  <form>
    <input type="text" {...birthDate.inputProps} maxLength={10} />
    {birthDate.error && <p>{birthDate.error}</p>}
  </form>
);
```

### Exemplo alterando errorText

Configurando as mensagens de erro padrão

```jsx
import { useInput } from "lx-react-form";

const password = useInput({
  name: "password",
  errorText: {
    required: "This field is required",
    same: "Confirm password must match with password",
    minLength: "Password must contain at least 8 characters",
  },
});

return (
  <form>
    <input type="password" {...password.inputProps} />
    {password.error && <p>{password.error}</p>}
  </form>
);
```

## (useCheckbox) - Validações de checkbox (type checkbox)

Você pode validar checkbox com o hook `useCheckbox`

```jsx
import { useCheckbox } from "lx-react-form";

const example = useCheckbox({
  name: "privacy",
});

return (
  <form>
    <label htmlFor={example.name}>
      <input type="checkbox" {...example.checkProps} />
      <span>Eu aceito a política de privicidade</span>
    </label>
    {example.error && <p>{example.error}</p>}
  </form>
);
```

Confira abaixo todas as opções disponíveis para o hook `useCheckbox`

| Opções       | Obrigatório | Descrição                                                                             |
| ------------ | ----------- | ------------------------------------------------------------------------------------- |
| name         | Sim\*       | O nome do campo é essencial para identificação tanto no HTML quanto no hook `useForm` |
| optional     | Não         | Define se o campo é opcional ou não, padrão `false`.                                  |
| initialValue | Não         | Define um valor inicial para o campo                                                  |
| errorText    | Não         | Permite customizar a mensagens de erro de padrão: `required`                          |
