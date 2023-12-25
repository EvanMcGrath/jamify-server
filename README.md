
# Jamify

Jamify reimagines the Spotify experience for musicians who love to jam along with their favorite tracks. This platform offers a seamless way for musicians to practice and jam along with their saved Spotify playlists, empowering them to hone their skills, develop their creativity, and ultimately become better musicians.

## Getting Started

Clone both the jamify-client and the jamify-server repo.

```
  git clone git@github.com:EvanMcGrath/jamify-client.git
  git clone git@github.com:EvanMcGrath/jamify-server.git
```

Go to the project directory

```
  cd jamify-client
  cd jamify-server
```

Install dependencies for both repos.

```
  npm install
```

Start project (client)

```
  npm start
```

Start project (server)

```
  npm run dev
```

## API Reference

#### Login

```
  GET /login
```

Description                
:------------------------- 
  This route begins the OAuth process to authorize the app to acces the user's spotify account.  


#### Login/Callback

```
GET /login/callback
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query` | `code` | This endpoint receives the authorization code parameter, after the user gives permissions for Spotify to share the relevant information to Jamify, sends it back to the Spotify API and gets in response the authorization token, the refresh token and when the authorization token expires in. |

#### Login/Refresh_Token

```
  GET /login/refresh_token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `access token` | The refresh token endpoint to get a new access token from spotify (access tokens expire after 1 hour). The utils/spotify.js file will automatically call this endpoint when the token expires. |

#### UserInfo/me

```
  GET /userInfo/me
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `access token` | This endpoint checks to see if current user is a new user and either saves their info or sends the returning user's relevant information. |

#### Playlist/:id

```
  GET /playlist/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `id` | This endpoint finds the playlists in the database and sends the song information to the front end. |

#### /song

```
  GET /song
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `access token & song URI` | This endpoint calls the spotify API parses the response and sends the relevant song informaiton. |

## Mongo DB

In order to successfully run the project you will have to have a local MongoDB connected to the jamify-server.
For more information on how to set up a local MongoDB visit https://www.mongodb.com/docs/manual/introduction/.

## Authors

- [@EvanMcGrath](https://www.github.com/EvanMcGrath)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REDIRECT_URI`

`CLIENT_ID`

`CLIENT_SECRET`

These are developer values that you need to get through registering with Spotify. 
