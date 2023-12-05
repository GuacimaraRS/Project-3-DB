# Project-3-DB-WEB
- WEB PHOTOGUA5IVE
  
## Summary

### Team:
Danito, Carlos and Guaci 

### Project Idea:
In this last Project we have to create a website with all its functions, which will consist of creating the design of such a website and being able to connect it with the database previously created and in turn being able to reserve or buy things online.
The project we have chosen has been a photographer's website, where the user can register on said page, to be able to book sessions and be able to see the photos that the photographer has taken on such occasions. In turn, the photographer will be able to manage his agenda, by booking the sessions that the client reserves.
When booking an appointment to take photos, the client will have to leave a deposit, which we will give them the option to do by transfer, by payment by debit card or by Bizum.
Below we are going to show and explain the tables of our DB

Roles: There will be 3 main roles:
- Admin: This role has full permissions. It can view, create, update and delete information from all tables.
- Photographer: This role can see all the information. Create, update and delete images, event, category, pack and services. You can view client information, but you can not create, update, or delete it.
- Client: Clients can see the images, the events, the categories, the packs and the services that the photographer has created. Customers can only create, modify and delete an appointment
  
### Tables:
![image](https://github.com/PhotoGua5ive/Project-3-DB/assets/134494931/e5a57596-f218-4061-925c-8e2e4698d9e6)


### Authentication Endpoints
![Captura de pantalla 2023-11-30 173818](https://github.com/PhotoGua5ive/Project-3-DB/assets/134494931/11ce053c-747e-469c-ae0c-0de855cb1ba9)

## Endpoints
### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION        | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | user | User Signup        | `name_User`, `phone`, `email`, `password`       | { token: `token` }
POST   | /auth/login      | -     | user | User Login         | `email`, `password`                             | { token: `token` }

### User Endpoints 


