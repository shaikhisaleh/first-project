export class User {
    constructor(
        public name:string,
        public id:string,
        private _token:string,
        private tokenExpirationDate:Date
        ){}
    get token(){
        if(!this._token || new Date() > this.tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}