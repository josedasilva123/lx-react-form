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

## Validações de input (text, email, number) ou textarea

Você pode validar esses tipos de campo com o hook `useInput`

```jsx
import { useInput } from "lx-react-form"

const example = useInput({
    name: "example",
    validation: "telefone",
    mask: "telefone",
})

return(
    <form>
        <input {...example.inputProps}/>
        {example.error && <p>{example.error}</p>}
    </form>
)
```

Confira abaixo todas as opções disponíveis para o hook `useInput`

| Opções | Obrigatório | Descrição |
| ------ | ------ | ------ |
| name | Sim* | O nome do campo é essencial para identificação tanto no HTML quanto no hook `useForm` |
| optional | Não | Define se o campo é opcional ou não, padrão `false`. |
| initialValue | Não | Define um valor inicial para o campo |
| same | Não | Permite relacionar campos, para exigir que o valor dos mesmos precise corresponder |
| validation | Não | Utiliza uma validação padrão disponível: email, cep, senha, telefone |
| customValidation | Não | Permite a utilização de regex próprio para validação |
| mask | Não | Utiliza uma máscara padrão disponível: cep, cpf, cnpj, telefone, inteiros |
| customMask | Não | Permite o uso de uma máscara customizada |

| errorText | Não | Permite customizar a mensagens de erro de padrão: `optional`, `same` e `minLength` |

### Exemplo same

```jsx
import { useInput } from "lx-react-form"

const password = useInput({
    name: "password",
    validation: "senha",
})

const confirmpassword = useInput({
    name: "confirmpassword",
    same: example.value,
})

return(
    <form>
        <input {...password.inputProps}/>
        {password.error && <p>{password.error}</p>}

        <input {...confirmpassword.inputProps}/>
        {confirmpassword.error && <p>{confirmpassword.error}</p>}
    </form>
)
```

### Exemplo customValidation

```jsx
import { useInput } from "lx-react-form"

const password = useInput({
    name: "example",
    customValidation: {
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        error: "Sua senha precisa conter 8 caracteres, pelo menos uma letra e um número"
    }
})

return(
    <form>
        <input {...password.inputProps}/>
        {password.error && <p>{password.error}</p>}
    </form>
)
```