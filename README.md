# Project-3-DB-WEB
- WEB EYES OF LIFE
  
## Summary

### Team:
Danito, Carlos and Guaci 

### Project Idea:
In this last Project we have to create a website with all its functions, which will consist of creating the design of such a website and being able to connect it with the database previously created and in turn being able to reserve or buy things online.
The project we have chosen has been a photographer's website, where the user can register on said page, to be able to book sessions and be able to see the photos that the photographer has taken on such occasions. In turn, the photographer will be able to manage his agenda, by booking the sessions that the client reserves.
When booking an appointment to take photos, the client will have to leave a deposit, which we will give them the option to do by transfer, by payment by debit card or by Bizum.
Below we are going to show and explain the tables of our DB

Roles: There will be 3 main roles:
- Admin: This role has full permissions. It can view, create, update and delete information from all tables.But the admin can't update a comment and Messages
- Photographer: This role can see all the information. Create, update and delete imagen, event, pack, galery and reservation. You can view client information, but you can not create, update, or delete it. Also the Photographer can create and read the Messages and only read de comment of client.
- Client: Clients can see the images, galery, pack,event, reservation, messages, comment, photographer and profile it. Customers can only create, modify and delete a reservation. And can only create and read messages. Also, the client can only created, read and delete a comment

  
### Relationships between tables:

#### One to one:
-Ref: user.idUser - contactInfoPhotographer.idContactInfo

#### One to many:
- Ref: user.idUser < comments.idComment
- Ref: user.idUser < messages.idMessage
- Ref: user.idUser < galery.idGalery
- Ref: user.idUser < reservation.idReservation
- Ref: galery.idGalery  < imagen.idImagen  
- Ref: event.idEvent < pack.idPack
- Ref: pack.idPack < reservation.idReservation


### Tables:
![image](https://github.com/PhotoGua5ive/Project-3-DB/assets/134494931/9b4cca38-0051-4afb-91bb-bafe1c1a2686)



### Authentication Endpoints
![image](https://github.com/PhotoGua5ive/Project-3-DB/assets/134494931/70b870ac-8ed7-45f5-947b-d23fe92e73d4)


## Endpoints
### User Signup/Login

METHOD | ENDPOINT                  | TOKEN |  ROLE        | DESCRIPTION              | POST PARAMS                                                                           | RETURNS
-------|---------------------------|-------|--------------|--------------------------|---------------------------------------------------------------------------------------|--------------------
POST   | /auth/signup              | -     | client       | Client Signup            | `name_User`, `phone`, `email`, `password`                                             | { token: `token` }
POST   | /auth/signup/professional | -     | photographer | Photographer Signup      | `name_User`, `phone`, `email`, `password`, `address`, `service`, `social_media`       | { token: `token` }
POST   | /auth/login               | -     | client       | Client Login             | `email`, `password`                                                                   | { token: `token` }


### User Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE         | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------------------|-------|--------------|--------------------------|-------------------------------------------------|--------------------
GET    | /user                        | YES   | admin        | Get All user             |  `query params`                                 | [{user}]
GET    | /user/profile                | YES   | client       | Get own profile          |                                                 | {user}
GET    | /user/ContactInfo            | YES   | client       | Get All photographer     |  `query params`                                 | [{ContactInfo_Photographer}]
GET    | /user/:idContactInfo         | YES   | client       | Get One photographer     |                                                 | {ContactInfo_Photographer}
POST   | /user                        | YES   | admin        | Create own profile       | `name_User`,`phone`,`email`,`password`,`role`   | {user}
PUT    | /user/profile                | YES   | client       | Update own profile       | `name_User`, `phone`, `email`, `password`       | {message: 'Client updated'}
PUT    | /user/:idUser                | YES   | admin        | Update one client        | `name_User`, `phone`, `email`, `password`       | {message: 'Client updated'}
PUT    | /user/password               | YES   | client       | Reset password           | `newPassword` `repeatPassword`                  | { message: 'Password updated }
DELETE | /user/profile                | YES   | client       | Delete own profile       |                                                 | { message: 'Profile deleted' }
DELETE | /user/:idUser                | YES   | admin        | Delete one client        |                                                 | {message: 'Client deleted'}

### ContactInfo_Photographer Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE         | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|--------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /ContactInfo/profile         | YES   | photographer | Get photographer profile |                                                                                    | {ContactInfo_Photographer}
POST   | /ContactInfo                 | YES   | admin        | Create Contact info      | `name_User`, `phone`, `email`, `password`, `address`, `service`, `social_media`    | {photographerProfile}
PUT    | /ContactInfo/profile         | YES   | photographer | Update Contact info      |  `name_User`, `phone`, `email`, `password`, `address`, `service`, `social_media`   | {message: 'Photographer updated'}
DELETE | /ContactInfo/profile         | YES   | photographer | Delete Contact info      |                                                                                    | { message: 'Photographer Profile deleted' }

### Reservation Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE         | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|--------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /reservation                 | YES   | client       | Get All reservation      |  `query params`                                                                    | [{reservation}]
GET    | /reservation/:idreservation  | YES   | client       | Get One reservation      |  `query params`                                                                    | {reservation}
POST   | /reservation                 | YES   | client       | Create one reservation   | `day_date`, `hour_date`, `idUser`, `ìdPhotographer`, `idPack`                      | {message: 'Reservation created'}
PUT    | /reservation/:idreservation  | YES   | client       | Update one reservation   |  `day_date`, `hour_date`                                                           | {message: 'Reservation updated'}
DELETE | /reservation/:idreservation  | YES   | client       | Delete one reservation   |                                                                                    | { message: 'Reservation deleted' }

### Pack Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE         | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|--------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /pack                        | YES   | client       | Get All pack             |  `query params`                                                                    | [{pack}]
GET    | /pack/:idPack                | YES   | client       | Get One pack             |  `query params`                                                                    | {pack}
POST   | /pack                        | YES   | photographer | Create one pack          | `name_Pack`, `price`, `price_reservation`, `description`, `idEvent`                | {message: 'Pack created'}
PUT    | /pack/:idPack                | YES   | photographer | Update one pack          |  `name_Pack`, `price`, `price_reservation`, `description                           | {message: 'Pack updated'}
DELETE | /pack/:idPack                | YES   | photographer | Delete one pack          |                                                                                    | { message: 'Pack deleted' }

### Event Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE         | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|--------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /event                       | YES   | client       | Get All event            |  `query params`                                                                    | [{event}]
GET    | /event/:idEvent              | YES   | client       | Get One event            |  `query params`                                                                    | {event}
POST   | /event                       | YES   | photographer | Create one event         | `name_event`, `description`                                                        | {message: 'Event created'}
PUT    | /event/:idEvent              | YES   | photographer | Update one event         |  `name_event`, `description`                                                       | {message: 'Event updated'}
DELETE | /event/:idEvent              | YES   | photographer | Delete one event         |                                                                                    | { message: 'Event deleted' }


### Galery Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE         | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|--------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /galery                      | YES   | client       | Get All galery           |  `query params`                                                                    | [{galery}]
GET    | /galery/:idGalery            | YES   | client       | Get One galery           |  `query params`                                                                    | {galery}
POST   | /galery                      | YES   | photographer | Create one galery        | `type_category`, `idImagen`                                                        | {message: 'Galery created'}
PUT    | /galery/:idGalery            | YES   | photographer | Update one galery        |  `type_category`                                                                   | {message: 'Galery updated'}
DELETE | /galery/:idGalery            | YES   | photographer | Delete one galery        |                                                                                    | { message: 'Galery deleted' }

### Imagen Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE         | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|--------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /imagen                      | YES   | client       | Get All imagen           |  `query params`                                                                    | [{imagen}]
GET    | /imagen/:idImagen            | YES   | client       | Get One imagen           |  `query params`                                                                    | {imagen}
POST   | /imagen                      | YES   | photographer | Create one imagen        | `title_imagen`, `description`, `url`                                               | {message: 'Imagen created'}
PUT    | /imagen/:idImagen            | YES   | photographer | Update one imagen        |  `title_imagen`, `description`, `url`                                              | {message: 'Imagen updated'}
DELETE | /imagen/:idImagen            | YES   | photographer | Delete one imagen        |                                                                                    | { message: 'Imagen deleted' }

### Comments Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE           | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|----------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /comment                     | YES   | client         | Get All comment          |  `query params`                                                                    | [{comment}]
GET    | /comment/:idComment          | YES   | client         | Get One comment          |  `query params`                                                                    | {comment}
POST   | /comment                     | YES   | only client    | Create one comment       | `description`, `score`                                                             | {message: 'Comment created'}
POST   | /comment/:idCommentAnswer    | YES   | client         | Answer one comment       | `description`                                                                      | {message: 'Comment answered'}
DELETE | /comment/:idComment          | YES   | [admin,client] | Delete one comment       |                                                                                    | { message: 'Imagen deleted' }

### Messages Endpoints 

METHOD | ENDPOINT                     | TOKEN | ROLE           | DESCRIPTION              | POST PARAMS                                                                        | RETURNS
-------|------------------------------|-------|----------------|--------------------------|------------------------------------------------------------------------------------|--------------------
GET    | /message                     | YES   | client         | Get All message          |  `query params`                                                                    | [{messages}]
GET    | /message/:idMessage          | YES   | client         | Get One message          |  `query params`                                                                    | {messages}
POST   | /message                     | YES   | only client    | Create one message       | `description`                                                                      | {message: 'Message sent'}
POST   | /message/:idAnswer           | YES   | client         | Answer one message       | `description`                                                                      | {message: 'Message answered'}
DELETE | /message/:idMessage          | YES   | admin          | Delete one message       |                                                                                    | { message: 'Message deleted' }







