export class MainController {
  constructor ($http) {
    'ngInject';
    this.$http = $http;
    this.getMessages();  
  }
  
  postMessage(){
   this.$http.post('http://localhost:8080/api/message', {
     msg: this.message
    });
  }

  getMessages(){
    var vn = this;
    this.$http.get('http://localhost:8080/api/message').then((result) => {
      vn.messages = result.data;
    });
  }
}