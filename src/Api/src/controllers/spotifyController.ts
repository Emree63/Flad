import IController from './interfaces/IController';
import { Router, Request, Response, NextFunction } from 'express';
import { CLIENT_ID_SPOTIFY, CLIENT_SECRET_SPOTIFY } from '../config';
import HttpException from '../exception/HttpException';
import axios from 'axios';
import qs from 'qs';

class SpotifyController implements IController {
  public path = '/spotify';
  public router = Router();
  private readonly API_URL = "https://accounts.spotify.com/api/token";
  private readonly CALLBACK = 'http://localhost:8080/api/spotify/callback';
  private readonly SCOPES = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing user-read-recently-played playlist-modify-public ugc-image-upload user-modify-playback-state';

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(`${this.path}/exchange`, this.login);
    this.router.get(`${this.path}/callback`, this.getAccessToken);
    this.router.get(`${this.path}/refresh`, this.getRefreshToken);
  }

  private readonly clientRedirect = 'spotify_final_redirect-uri-key';

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const redirectResponse = req.query.redirectUrl ? req.query.redirectUrl : req.headers.referer;
      res.cookie(this.clientRedirect, redirectResponse);
      res.redirect('https://accounts.spotify.com/authorize?' +
        qs.stringify({
          response_type: 'code',
          client_id: CLIENT_ID_SPOTIFY,
          scope: this.SCOPES,
          redirect_uri: this.CALLBACK,
        }));
    } catch (error) {
      next(new HttpException(400, "Cannot connect: " + error.message));
    }
  };

  private getRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const params = req.query.refresh_token;
      if (!req.query.refresh_token) {
        return res.json({
          "error": "Parameter refresh_token missing"
        });
      }
      let authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
          grant_type: 'refresh_token',
          refresh_token: params
        }),
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID_SPOTIFY + ':' + CLIENT_SECRET_SPOTIFY).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      };

      axios(authOptions)
        .then(session => {
          if (session.status === 200) {
            console.log('### Information : responce ###' + JSON.stringify(session.data));
            console.log('### Information : refresh_token ###' + session.data.refresh_token);

            res.send({
              "access_token": session.data.access_token,
              "refresh_token": session.data.refresh_token,
              "expires_in": session.data.expires_in
            });
          }
        });
      console.log("goood");
    } catch (error) {
      console.log("errur");
      next(new HttpException(400, 'Cannot create post'));
    }

  }

  private getAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    let code = req.query.code;
    let storedredirectUri = req.cookies ? req.cookies[this.clientRedirect] : null;

    var authOptions = {
      method: 'POST',
      url: this.API_URL,
      data: qs.stringify({
        code: code,
        redirect_uri: this.CALLBACK,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID_SPOTIFY + ':' + CLIENT_SECRET_SPOTIFY).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };
    try {
      var resp = await axios(authOptions);
      if (resp.status === 200) {
        let access_token = resp.data.access_token;
        let expiration = resp.data.expires_in;
        let refresh = resp.data.refresh_token
        console.log(access_token);

        res.clearCookie(this.clientRedirect);
        res.redirect(`${storedredirectUri}?` +
          qs.stringify({
            "access_token": access_token,
            "expires_in": expiration,
            "refresh_token": refresh
          }));
      }
    } catch (error) {
      console.log(error);
      next(new HttpException(400, 'Error connection: ' + error.message));
    }
  };
}

export default SpotifyController;