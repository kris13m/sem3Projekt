const url = "https://vasklet.azurewebsites.net//api/LoginRequest/"

const googleId = document.getElementById('google-id')
const googleStatus = document.getElementById('google-status')

window.onload = function(){
    let googleBtn = document.getElementById('google-login-btn')
    auth2.attachClickHandler(googleBtn, {},
        function(googleUser) {         
              getGoogleId(googleUser)
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
}

function init() {
    gapi.load('auth2', function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
    });
}


function getGoogleId(googleUser){
    let googleBtn = document.getElementById('google-login-btn')
    var auth2 = gapi.auth2.getAuthInstance();
    var profile = auth2.currentUser.get().getBasicProfile();
    console.log(profile.getId())
    googleId.value = profile.getId()
    googleBtn.innerText = "google id modtaget"
    console.log(googleId.value)
}

gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
        client_id: '842417189442-1vfdnhn31bm7poc2ba3sf5qvhj3dguvj.apps.googleusercontent.com'
    });
    // This is what you use to listen for user changes
});

Vue.createApp({
    data(){
        return {
            loginRequest: {googleId: null, fornavn: null, efternavn: null, room: null},
            requestStatus: null
        }
    },
    methods: {
        async sendRequest(){
            if(googleId.value != "" && this.loginRequest.fornavn != null && this.loginRequest.efternavn != null && this.loginRequest.room != null){
                //console.log("for: " + this.loginRequest.fornavn + " efter: " + this.loginRequest.efternavn + " id: " + googleId.value + " nummer: " + this.loginRequest.room)
                this.loginRequest.googleId = googleId.value
                console.log(this.loginRequest)
                const response = await axios.post(url, this.loginRequest)
                console.log(response.data)
                
                if(response.data == true)
                    window.location.href = "success.html"
                else
                    this.requestStatus = "Noget gik galt. Prøv igen senere"
            }else{
                this.requestStatus = "Et felt mangler at blive udfyldt"
                console.log("for: " + this.loginRequest.fornavn + " efter: " + this.loginRequest.efternavn + " id: " + googleId.value + " nummer: " + this.loginRequest.room)
            }
        }
    }
}).mount("#app")