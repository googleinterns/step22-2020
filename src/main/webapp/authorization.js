// GCP Generated GitHub OAuth configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAR88Giah8cCEAvT_zDSIREWvgIIAeS8yY',
  authDomain: 'step2020-279820.firebaseapp.com',
};

/**
 * Object used for GitHub authorization and as a wrapper for firebase.
 * It handles Firebase initialization on instantiation and holds nifty
 * functions for handling gitHub authorization. We are using a class to have
 * access tokens persist for ease of use on the backend
 *
 * Make sure to include the scripts below in any HTML File that uses this class
 *
 * <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase.js"></script>
 * <script type="module" src="authorization.js"></script>
 *
 * NOTE: The authorization.js file location might change.
 */
class GitHubAuthorizer {
  constructor() { // eslint-disable-line
    GitHubAuthorizer.initializeFirebase();

    /** @type {string} gitHub API token */
    this.token = null;

    /**
     * the firbase instance associated with a given 
     * GitHubAuthorizer
     * @type {Firebase} 
     */
    this.firebase = firebase; // eslint-disable-line
  }

  /**
   * The most recent access token for the GitHub API. To refresh this, the user
   * must be signed out and signed in again. It is important to keep in mind
   * that this token expires and must be used swiftly after calling
   * toggleSignIn(). If authorization is yet to be toggled, this will return
   * null. If an error occurs during authorization, it will again be set to
   * null. This property will be set to null on sign out as well.
   *
   * NOTE: In the event that an access token times out, the token will still be
   * available here and so, a non-null token is not a good sign of a valid
   * token.
   *
   * @return {string} most recent token or null
   */
  getToken() {
    return this.token;
  }

  /**
   * The current user if authorized and null if not. For all intents and
   * purposes, this function will serve as a true/false value in an if
   * statement.
   *
   * @return {Firebase.User} current user or null
   */
  getUser() {
    return this.firebase.auth().currentUser;
  }

  /**
   * Get firebase instance used with this object
   * @return {Firebase} firebase instance
   */
  getFirebase() {
    return this.firebase;
  }

  /**
   * Function called when authorizing user to verify them as a gitHub user.
   * This function doubles as an opt out when the current user wants to leave
   * our site for good.
   *
   * Side Effects: when authorizing a user, it sets the current objects token
   * to the returned GitHub API accessToken if a token is returned.
   *
   * NOTE: this function is asynchronous and should be used with an await
   *
   * @return {boolean} true if no errors occured during authorization, false
   * otherwise
   */
  async toggleAuthorization() {
    const firebase = this.firebase;
    if (!firebase.auth().currentUser) {
      try {
        let provider = new firebase.auth.GitHubAuthProvider();
        let authorizationResults =
          await firebase.auth().signInWithPopup(provider);
        // This gives you a GitHub Access Token.
        // You can use it to access the GitHub API.
        this.token = await authorizationResults.credential.accessToken;
      } catch (error) {
        // Handle Errors here.
        console.error(error);
        // TODO: Change this in future iterations
        alert(error.message);
        this.token = null;
        return false
      }
    } else {
      // if logged in, sign out
      firebase.auth().signOut();
      this.token = null;
    }
    return true
  }

  /**
   * Initialize firebase if firebase is not already initialized. This method can
   * be called as many times as we need without any side effects.
   *
   * NOTE: This is not an instance function and will not be exported.
   */
  static initializeFirebase() {
    if (firebase.apps.length === 0) { // eslint-disable-line
      firebase.initializeApp(firebaseConfig); // eslint-disable-line
    }
  }
}

export let gitHubAuthorizer = new GitHubAuthorizer();
