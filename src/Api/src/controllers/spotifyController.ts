import IController from './interfaces/IController';
import { Router, Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';

class SpotifyController implements IController {
  public path = '/spotify';
  public router = Router();
  public readonly CLIENT_ID_SPOTIFY = process.env.CLIENT_ID_SPOTIFY;
  public readonly CLIENT_SECRET_SPOTIFY = process.env.CLIENT_SECRET_SPOTIFY;
  private readonly API_URL = "https://accounts.spotify.com/api/token";
  private readonly CALLBACK = 'http://localhost:8080/api/spotify/callback';
  private readonly SCOPES = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing user-read-recently-played playlist-modify-public ugc-image-upload user-modify-playback-state';

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    /**
     * @swagger
     * /api/spotify/exchange:
     *   get:
     *     summary: Initiate the Spotify login flow
     *     description: Redirect the user to the Spotify login page for authorization
     *     tags:
     *       - Spotify
     *     parameters:
     *       - in: query
     *         name: redirectUrl
     *         schema:
     *           type: string
     *         description: The URL to redirect the user after Spotify authorization (optional)
     *     responses:
     *       302:
     *         description: Redirecting to Spotify login page
     *       400:
     *         description: Bad request - Cannot connect to Spotify
     */
    this.router.get(`${this.path}/exchange`, this.login);

    /**
     * @swagger
     * /api/spotify/callback:
     *   get:
     *     summary: Handle Spotify callback and exchange code for access token
     *     description: Handle Spotify callback and exchange the received code for an access token
     *     tags:
     *       - Spotify
     *     responses:
     *       302:
     *         description: Redirecting with access token information
     *       400:
     *         description: Bad request - Error connecting to Spotify
     */
    this.router.get(`${this.path}/callback`, this.getAccessToken);

    /**
     * @swagger
     * /api/spotify/refresh:
     *   get:
     *     summary: Refresh the Spotify access token using a refresh token
     *     description: Refresh the Spotify access token using a refresh token
     *     tags:
     *       - Spotify
     *     parameters:
     *       - in: query
     *         name: refresh_token
     *         schema:
     *           type: string
     *         required: true
     *         description: The refresh token obtained during the initial authorization
     *     responses:
     *       200:
     *         description: Successfully refreshed access token
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 access_token:
     *                   type: string
     *                   description: The new access token
     *                 refresh_token:
     *                   type: string
     *                   description: The new refresh token
     *                 expires_in:
     *                   type: number
     *                   description: The time until the access token expires (in seconds)
     *       400:
     *         description: Bad request - Cannot refresh the access token
     */
    this.router.get(`${this.path}/refresh`, this.getRefreshToken);
  }

  private readonly clientRedirect = 'spotify_final_redirect-uri-key';

  private login = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const redirectResponse = req.query.redirectUrl ? req.query.redirectUrl : req.headers.referer;
      res.cookie(this.clientRedirect, redirectResponse);
      res.redirect('https://accounts.spotify.com/authorize?' +
        qs.stringify({
          response_type: 'code',
          client_id: this.CLIENT_ID_SPOTIFY,
          scope: this.SCOPES,
          redirect_uri: this.CALLBACK,
        }));
    } catch (error) {
      res.status(400).send('Cannot connect: ' + error.message);
    }
  };

  private getRefreshToken = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const params = req.query.refresh_token;
    if (!req.query.refresh_token) {
      return res.json({
        "error": "Parameter refresh_token missing"
      });
    }
    const authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: params
      }),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(this.CLIENT_ID_SPOTIFY + ':' + this.CLIENT_SECRET_SPOTIFY).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    axios(authOptions)
      .then(session => {
        if (session.status === 200) {
          res.send({
            "access_token": session.data.access_token,
            "refresh_token": session.data.refresh_token,
            "expires_in": session.data.expires_in
          });
        }
      })
      .catch(error => {
        res.status(400).send("Cannot get a new refresh token");
      });
  }

  private getAccessToken = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    let code = req.query.code;
    let storedRedirectUri = req.cookies ? req.cookies[this.clientRedirect] : null;
    let authOptions = {
      method: 'POST',
      url: this.API_URL,
      data: qs.stringify({
        code: code,
        redirect_uri: this.CALLBACK,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(this.CLIENT_ID_SPOTIFY + ':' + this.CLIENT_SECRET_SPOTIFY).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };
    try {
      const resp = await axios(authOptions);
      if (resp.status === 200) {
        let access_token = resp.data.access_token;
        let expiration = resp.data.expires_in;
        let refresh = resp.data.refresh_token
        res.clearCookie(this.clientRedirect);
        res.redirect(`${storedRedirectUri}?` +
          qs.stringify({
            "access_token": access_token,
            "expires_in": expiration,
            "refresh_token": refresh
          }));
      }
    } catch (error) {
      res.status(400).send('Error connection: ' + error.message);
    }
  };
}

export default SpotifyController;