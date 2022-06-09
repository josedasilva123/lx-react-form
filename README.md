# LX React Form

## Notas de atualização

## 1.1.1

- Fix Correção de pequenos bugs
- Feat: Lançamento da feature de steps (formulários em etapa)

## 1.0.2
- Fix: (Essencial) Correção de bugs que impediam o envio de select e checkbox na função handleSubmit


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
    <input type="text" {...example.inputProps} maxLength="15" />
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
| minLength        | Não         | O número de caracteres mínimo para o respectivo campo                                 |
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
  same: password.value,
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
import { useInput } from "lx-react-form";

const password = useInput({
  name: "password",
  customValidation: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    error:
      "Sua senha precisa conter 8 caracteres, pelo menos uma letra e um número",
  },
});

return (
  <form>
    <input type="password" {...password.inputProps} />
    {password.error && <p>{password.error}</p>}
  </form>
);
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
    <input type="text" {...birthDate.inputProps} maxLength="10" />
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
      <input type="checkbox" {...example.inputProps} />
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
| initialValue | Não         | Define um valor inicial para o campo (precisa ser obrigatoriamente `true` ou `false`) |
| errorText    | Não         | Permite customizar a mensagens de erro de padrão: `required`                          |

## (useSelect) - Validações de select

Você pode validar select com o hook `useSelect`

```jsx
import { useSelect } from "lx-react-form";

const example = useSelect({
  name: "ocupation",
});

return (
  <form>
    <select {...example.inputProps}>
      <option value="">Selecione uma ocupação</option>
      <option value="pedreiro">Pedreiro</option>
      <option value="padeiro">Padeiro</option>
    </select>
    {example.error && <p>{example.error}</p>}
  </form>
);
```

Confira abaixo todas as opções disponíveis para o hook `useSelect`

| Opções       | Obrigatório | Descrição                                                                             |
| ------------ | ----------- | ------------------------------------------------------------------------------------- |
| name         | Sim\*       | O nome do campo é essencial para identificação tanto no HTML quanto no hook `useForm` |
| optional     | Não         | Define se o campo é opcional ou não, padrão `false`.                                  |
| initialValue | Não         | Define um valor inicial para o campo                                                  |
| errorText    | Não         | Permite customizar a mensagens de erro de padrão: `required`                          |

## (useForm) - hook para gerar a função de envio dos formulários

O `useForm` condensa os campos em única lista e executa todas as validações antes de executar a função de envio

```jsx
import { useForm } from "lx-react-form";

const form = useForm({
  clearFields: true,
  formFields: [campo1, campo2, campo3],
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

| Opções         | Obrigatório | Descrição                                                                                                             |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| clearFields    | Não         | Limpa os campos após um envio bem sucedido do formulário                                                              |
| formFields     | Sim\*       | Lista de campos do formulário (se refere aos hooks instaciados)                                                       |
| submitCallback | Não         | Função de callback do envio, recebe como parâmetro padrão `formData` contendo um objeto com todos os campos e valores |

## Formulários de etapas - uso avançado do useForm

Com o useForm é possível, além da criação de formulários convencionais, formulários com etapas

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
  stepFields: {
    0: [name, email],
    1: [password],
  }
  formFields: [name, email, password],
  submitCallback: (formData) => {
    console.log(formData);
  },
});

return (
  <form onSubmit={form.handleSubmit}>
    {form.step === 0 && (
      <>
        <input type="text" {...name.inputProps} />
        {name.error && <p>{name.error}</p>}

        <input type="email" {...email.inputProps} />
        {email.error && <p>{email.error}</p>}

        <button type="button" onClick={() => form.nextStep()}>
          Avançar
        </button>
      </>
    )}

    {form.step === 1 && (
      <>
        <input type="password" {...password.inputProps} />
        {password.error && <p>{password.error}</p>}

        <button type="button" onClick={() => form.previousStep()}>
          Voltar
        </button>

        <button type="submit">Enviar</button>
      </>
    )}
   
  </form>
);
```

| Opções         | Obrigatório | Descrição                                                                                                             |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| stepFields    | Sim\*         | Um objeto contendo uma lista de campos para cada etapa do formulário                                                    |
| stepMode     | Não       | No modo onChange, permite que as validações aconteçam (sem notificação de erro) a cada alteração mínima de campo (pode servir para liberar os botões de avançar e enviar somente quando todos os requisitos estiverem preenchidos)     |
| stepClearFieldsOnBack | Não         | A função previousStep limpa os campos da etapa respectiva |

### Exemplo de etapas com stepMode onChange

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
  stepMode: "onChange"
  stepFields: {
    0: [name, email],
    1: [password],
  }
  formFields: [name, email, password],
  submitCallback: (formData) => {
    console.log(formData);
  },
});

return (
  <form onSubmit={form.handleSubmit}>
    {form.step === 0 && (
      <>
        <input type="text" {...name.inputProps} />
        {name.error && <p>{name.error}</p>}

        <input type="email" {...email.inputProps} />
        {email.error && <p>{email.error}</p>}

        {form.canProceed && (
          <button type="button" onClick={form.nextStep}>
            Avançar
          </button>
        )}
      </>
    )}

    {form.step === 1 && (
      <>
        <input type="password" {...password.inputProps} />
        {password.error && <p>{password.error}</p>}

        <button type="button" onClick={form.previousStep}>
          Voltar
        </button>
        {form.canProceed && (
          <button type="submit">Enviar</button>
        )}
      </>
    )}   
  </form>
);
```

This is LX React Form!
