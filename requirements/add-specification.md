# Create Specification

> ## Caso de sucesso

1. [] Receive a request type **POST** in route **/api/signup**
2. [x] Validate required data **name** and **description**
3. [x] Returns **201** with no data

> ## Exceções

1. [] Return an error **404** if API does not exists
2. [x] Return an error **400** if name or description are not provided
3. [] Return an error **403** if specification already exists
4. [x] Return an error **500** if goes wrong trying create a specification