import CallApi from "./CallApi";

// import {useState} from "react";

class Auth {

    token = null;
    userData = {};
    authenticated = false;

    constructor() {
        try {
            this.authenticated = JSON.parse(localStorage.getItem('authenticated'));
            // this.userData = JSON.parse(JSON.stringify(localStorage.getItem('userData')));
            this.userData = JSON.parse(localStorage.getItem('userData'));
            this.token = (localStorage.getItem('token'));
        } catch (e) {
            this.authenticated = false
            this.userData = ''
            this.token = ''
        }

    }

    // setToken(token)
    // {
    //     this.token=token;
    // }
    setUserData(userData)
    {
        this.userData=JSON.parse(JSON.stringify(userData))
        localStorage.setItem('userData', JSON.stringify(this.userData));
    }
    async login(email, password) {
        if (this.authenticated === false) {
            let temp = new CallApi()
            let res = null
            let err = null
            res = await temp.postData({
                data: {
                    email: email,
                    password: password
                }, apiUrl: 'mobileLogin'
            }).then(
                resp => {
                    if (resp.success===true) {
                        this.userData = resp.user;
                        this.token = resp.token;
                        this.authenticated = true;
                        localStorage.setItem('authenticated', 'true');
                        localStorage.setItem('token', this.token.toString());
                        localStorage.setItem('userData', JSON.stringify(this.userData));
                    }
                    return resp;
                }
            ).catch(
                error => {
                    err = error.data;
                    return err
                }
            )

            // return JSON.parse(JSON.stringify(res));
            return res
        } else {
            return {
                success: true,
                user: this.userData
            };
        }


        // let res = {
        //     success: true,
        // }
        // console.log('in login auth? '+this.authenticated)
        // if(this.authenticated===false) {
        //     let temp = new CallApi()
        //     let res = {
        //         success: false,
        //         massage: 'Invalid Email or Password'
        //     }
        //     try {
        //         console.log('Auth pre store pre fetch');
        //         res = await temp.postData({
        //             data: {
        //                 email: email,
        //                 password: password
        //             }, apiUrl: 'mobileLogin'
        //         });
        //         console.log('Auth pre store after fetch');
        //
        //         console.log('Auth pre store '+this);
        //         this.userData=res.user;
        //         this.token=res.token;
        //         this.authenticated = true;
        //         console.log('Auth pre store '+this.authenticated);
        //         localStorage.setItem('authenticated', 'true');
        //         localStorage.setItem('token', this.token.toString());
        //         localStorage.setItem('userData', JSON.stringify(this.userData));
        //         console.log('Auth done');
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
        // return res
    }

    async logout() {
        //mobileLogOut
        this.authenticated = false;
        let temp = new CallApi()
        let res = await temp.postData({
            data: {
                token: this.token,
            }, apiUrl: 'mobileLogOut'
        });
        localStorage.setItem('authenticated', 'false');
        localStorage.setItem('token', '');
        localStorage.setItem('userData', '');
        return res
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
