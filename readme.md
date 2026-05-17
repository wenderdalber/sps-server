----------------------------------
ESPANHOL
----------------------------------

## Prueba NODE

- Crear un CRUD (API REST) en Node para el registro de usuarios.
- Para la creación de la prueba, utilizar un repositorio falso de usuarios (puede ser en memoria).

## Reglas

- Debe existir un usuario administrador previamente registrado para utilizar la autenticación (no es necesario cifrar la contraseña):
{
  "name": "admin",
  "email": "admin@spsgroup.com.br",
  "type": "admin",
  "password": "1234"
}

- Crear una ruta de autenticación (token Jwt).
- Las rutas de la API solo pueden ser ejecutadas si el usuario está autenticado.
- Debe ser posible añadir usuarios con los campos: email, nombre, type, password.
- No debe ser posible registrar un correo electrónico ya existente.
- Debe ser posible eliminar usuarios.
- Debe ser posible modificar los datos de un usuario.


----------------------------------
PORTUGUÊS
----------------------------------

# Teste NODE

- Criar um CRUD (API REST) em node para cadastro de usuários
- Para a criação do teste utilizar um repositório fake dos usuários. (Pode ser em memória)

## Regras

- Deve existir um usuário admin previamente cadastrado para utilizar autenticação (não precisa criptografar a senha);
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin"
    password: "1234"
  }

- Criar rota de autenticação (Jwt token)
- As rotas da API só podem ser executadas se estiver autenticada
- Deve ser possível adicionar usuários. Campos: email, nome, type, password
- Não deve ser possível cadastrar o e-mail já cadastrado
- Deve ser possível remover usuário
- Deve ser possível alterar os dados do usuário
